import crypto from 'node:crypto';
import db from '../config/db.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'];

function createHttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function parseIsoDate(dateStr) {
  if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return null;
  }
  const [y, m, d] = dateStr.split('-').map(Number);
  const utc = Date.UTC(y, m - 1, d);
  const check = new Date(utc);
  if (
    check.getUTCFullYear() !== y ||
    check.getUTCMonth() !== m - 1 ||
    check.getUTCDate() !== d
  ) {
    return null;
  }
  return utc;
}

function generateBookingCode() {
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `WCR-${random}`;
}

export function createBooking(payload) {
  const carId = Number(payload?.car_id);
  const pickupDate = String(payload?.pickup_date || '').trim().slice(0, 10);
  const dropoffDate = String(payload?.dropoff_date || '').trim().slice(0, 10);
  const pickupLocation = String(payload?.pickup_location || '').trim();
  const dropoffLocation = String(payload?.dropoff_location || pickupLocation).trim();
  const customerName = String(payload?.customer_name || '').trim();
  const customerPhone = String(payload?.customer_phone || '').trim();
  const customerEmail = String(payload?.customer_email || '').trim().toLowerCase();
  const notes = String(payload?.notes || '').trim();

  if (!Number.isInteger(carId) || carId <= 0) {
    throw createHttpError(400, 'აირჩიეთ სწორი ავტომობილი');
  }
  if (!pickupDate || !dropoffDate || !pickupLocation || !customerName || !customerPhone || !customerEmail) {
    throw createHttpError(400, 'შეავსეთ ყველა სავალდებულო ველი');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    throw createHttpError(400, 'მიუთითეთ სწორი ელ-ფოსტის მისამართი');
  }

  const startMs = parseIsoDate(pickupDate);
  const endMs = parseIsoDate(dropoffDate);
  if (startMs === null || endMs === null) {
    throw createHttpError(400, 'თარიღის ფორმატი არასწორია');
  }

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayMs = parseIsoDate(todayStr);
  if (startMs < todayMs) {
    throw createHttpError(400, 'აყვანის თარიღი წარსულში ვერ იქნება');
  }

  const days = Math.round((endMs - startMs) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    throw createHttpError(400, 'დაბრუნების თარიღი აყვანის თარიღზე გვიან უნდა იყოს');
  }

  const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(carId);
  if (!car) {
    throw createHttpError(404, 'არჩეული ავტომობილი ვერ მოიძებნა');
  }

  const activeBookings = db
    .prepare(
      `SELECT id, pickup_date, dropoff_date, LOWER(TRIM(status)) AS status
       FROM bookings
       WHERE car_id = ?
         AND LOWER(TRIM(status)) IN ('pending', 'confirmed')`
    )
    .all(carId);

  const hasOverlap = activeBookings.some((b) => {
    const bStart = parseIsoDate(String(b.pickup_date || '').slice(0, 10));
    const bEnd = parseIsoDate(String(b.dropoff_date || '').slice(0, 10));
    if (bStart === null || bEnd === null) return false;
    return bStart < endMs && bEnd > startMs;
  });

  if (hasOverlap) {
    throw createHttpError(409, 'არჩეულ თარიღებში ეს ავტომობილი უკვე დაჯავშნილია');
  }

  const totalPrice = Number((days * Number(car.daily_price)).toFixed(2));

  let bookingCode = generateBookingCode();
  while (db.prepare('SELECT 1 FROM bookings WHERE booking_code = ?').get(bookingCode)) {
    bookingCode = generateBookingCode();
  }

  const insertStmt = db.prepare(`
    INSERT INTO bookings (
      booking_code,
      car_id,
      pickup_date,
      dropoff_date,
      pickup_location,
      dropoff_location,
      customer_name,
      customer_phone,
      customer_email,
      notes,
      total_days,
      total_price,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `);

  const result = insertStmt.run(
    bookingCode,
    carId,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
    customerName,
    customerPhone,
    customerEmail,
    notes,
    days,
    totalPrice
  );

  const created = getBookingById(Number(result.lastInsertRowid));
  return { booking: created, car };
}

export function getBookingById(id) {
  return db
    .prepare(
      `SELECT b.*, c.brand, c.model, c.year, c.category, c.daily_price, c.image_url
       FROM bookings b
       JOIN cars c ON c.id = b.car_id
       WHERE b.id = ?`
    )
    .get(id);
}

export function getBookingByCode(code) {
  const cleanCode = String(code || '').trim().toUpperCase();
  if (!cleanCode) return null;

  return db
    .prepare(
      `SELECT b.*, c.brand, c.model, c.year, c.category, c.daily_price, c.image_url
       FROM bookings b
       JOIN cars c ON c.id = b.car_id
       WHERE UPPER(b.booking_code) = ?`
    )
    .get(cleanCode);
}

export function getAllBookings(filters = {}) {
  const status = String(filters?.status || '').trim().toLowerCase();

  if (status && ALLOWED_STATUSES.includes(status)) {
    return db
      .prepare(
        `SELECT b.*, c.brand, c.model, c.year, c.category
         FROM bookings b
         JOIN cars c ON c.id = b.car_id
         WHERE LOWER(TRIM(b.status)) = ?
         ORDER BY b.created_at DESC, b.id DESC`
      )
      .all(status);
  }

  return db
    .prepare(
      `SELECT b.*, c.brand, c.model, c.year, c.category
       FROM bookings b
       JOIN cars c ON c.id = b.car_id
       ORDER BY b.created_at DESC, b.id DESC`
    )
    .all();
}

export function updateBookingStatus(id, status) {
  const bookingId = Number(id);
  const nextStatus = String(status || '').trim().toLowerCase();

  if (!Number.isInteger(bookingId) || bookingId <= 0) {
    throw createHttpError(400, 'ჯავშნის ID არასწორია');
  }
  if (!ALLOWED_STATUSES.includes(nextStatus)) {
    throw createHttpError(400, 'სტატუსი არასწორია');
  }

  const info = db
    .prepare('UPDATE bookings SET status = ? WHERE id = ?')
    .run(nextStatus, bookingId);

  if (info.changes === 0) return null;
  return getBookingById(bookingId);
}