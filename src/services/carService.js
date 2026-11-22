import db from '../config/db.js';

const ALLOWED_CATEGORIES = ['Sedan', 'SUV', 'Coupe', 'Luxury', 'Economy'];
const ALLOWED_TRANSMISSIONS = ['Automatic', 'Manual'];
const ALLOWED_FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];

function validateCarPayload(data, isPartial = false) {
  if (!isPartial) {
    if (!data.brand || !data.model || !data.year || !data.category || !data.transmission || !data.fuel_type || !data.daily_price || !data.image_url) {
      throw Object.assign(
        new Error('ავტომობილის სავალდებულო ველები (brand, model, year, category, transmission, fuel_type, daily_price, image_url) აუცილებელია'),
        { statusCode: 400 }
      );
    }
  }

  if (data.category !== undefined && !ALLOWED_CATEGORIES.includes(data.category)) {
    throw Object.assign(new Error('არასწორი კატეგორია'), { statusCode: 400 });
  }

  if (data.transmission !== undefined && !ALLOWED_TRANSMISSIONS.includes(data.transmission)) {
    throw Object.assign(new Error('არასწორი გადაცემათა კოლოფი'), { statusCode: 400 });
  }

  if (data.fuel_type !== undefined && !ALLOWED_FUELS.includes(data.fuel_type)) {
    throw Object.assign(new Error('არასწორი საწვავის ტიპი'), { statusCode: 400 });
  }

  if (data.daily_price !== undefined && Number(data.daily_price) <= 0) {
    throw Object.assign(new Error('დღიური ფასი უნდა იყოს 0-ზე მეტი'), { statusCode: 400 });
  }
}

export function getAllCars(filters = {}) {
  const conditions = ['is_active = 1'];
  const params = {};

  if (filters.category && ALLOWED_CATEGORIES.includes(filters.category)) {
    conditions.push('category = @category');
    params.category = filters.category;
  }

  if (filters.transmission && ALLOWED_TRANSMISSIONS.includes(filters.transmission)) {
    conditions.push('transmission = @transmission');
    params.transmission = filters.transmission;
  }

  if (filters.fuel_type && ALLOWED_FUELS.includes(filters.fuel_type)) {
    conditions.push('fuel_type = @fuel_type');
    params.fuel_type = filters.fuel_type;
  }

  if (filters.max_price && Number(filters.max_price) > 0) {
    conditions.push('daily_price <= @max_price');
    params.max_price = Number(filters.max_price);
  }

  if (filters.search && String(filters.search).trim()) {
    conditions.push('(LOWER(brand) LIKE @search OR LOWER(model) LIKE @search)');
    params.search = `%${String(filters.search).trim().toLowerCase()}%`;
  }

  if (filters.pickup_date && filters.dropoff_date) {
    conditions.push(`
      id NOT IN (
        SELECT car_id FROM bookings
        WHERE status IN ('pending', 'confirmed', 'active')
          AND pickup_date < @dropoff_date
          AND dropoff_date > @pickup_date
      )
    `);
    params.pickup_date = filters.pickup_date;
    params.dropoff_date = filters.dropoff_date;
  }

  const query = `SELECT * FROM cars WHERE ${conditions.join(' AND ')} ORDER BY daily_price ASC`;
  return db.prepare(query).all(params);
}

export function getCarById(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) return null;

  const car = db.prepare('SELECT * FROM cars WHERE id = ?').get(numericId);
  if (!car) return null;

  const bookedRanges = db.prepare(`
    SELECT pickup_date, dropoff_date, status
    FROM bookings
    WHERE car_id = ? AND status IN ('pending', 'confirmed', 'active')
    ORDER BY pickup_date ASC
  `).all(numericId);

  return { ...car, booked_ranges: bookedRanges };
}

export function createCar(data) {
  validateCarPayload(data, false);

  const result = db.prepare(`
    INSERT INTO cars (
      brand, model, year, category, transmission, fuel_type,
      seats, daily_price, deposit, image_url, description_ka, description_en, is_active
    ) VALUES (
      @brand, @model, @year, @category, @transmission, @fuel_type,
      @seats, @daily_price, @deposit, @image_url, @description_ka, @description_en, @is_active
    )
  `).run({
    brand: String(data.brand).trim(),
    model: String(data.model).trim(),
    year: Number(data.year),
    category: data.category,
    transmission: data.transmission,
    fuel_type: data.fuel_type,
    seats: Number(data.seats || 5),
    daily_price: Number(data.daily_price),
    deposit: Number(data.deposit ?? 0),
    image_url: String(data.image_url).trim(),
    description_ka: data.description_ka ? String(data.description_ka).trim() : '',
    description_en: data.description_en ? String(data.description_en).trim() : '',
    is_active: data.is_active !== undefined ? Number(Boolean(data.is_active)) : 1
  });

  return getCarById(result.lastInsertRowid);
}

export function updateCar(id, data) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) return null;

  const existing = db.prepare('SELECT * FROM cars WHERE id = ?').get(numericId);
  if (!existing) return null;

  validateCarPayload(data, true);

  const updated = {
    brand: data.brand !== undefined ? String(data.brand).trim() : existing.brand,
    model: data.model !== undefined ? String(data.model).trim() : existing.model,
    year: data.year !== undefined ? Number(data.year) : existing.year,
    category: data.category ?? existing.category,
    transmission: data.transmission ?? existing.transmission,
    fuel_type: data.fuel_type ?? existing.fuel_type,
    seats: data.seats !== undefined ? Number(data.seats) : existing.seats,
    daily_price: data.daily_price !== undefined ? Number(data.daily_price) : existing.daily_price,
    deposit: data.deposit !== undefined ? Number(data.deposit) : existing.deposit,
    image_url: data.image_url !== undefined ? String(data.image_url).trim() : existing.image_url,
    description_ka: data.description_ka !== undefined ? String(data.description_ka).trim() : existing.description_ka,
    description_en: data.description_en !== undefined ? String(data.description_en).trim() : existing.description_en,
    is_active: data.is_active !== undefined ? Number(Boolean(data.is_active)) : existing.is_active
  };

  db.prepare(`
    UPDATE cars
    SET brand = @brand,
        model = @model,
        year = @year,
        category = @category,
        transmission = @transmission,
        fuel_type = @fuel_type,
        seats = @seats,
        daily_price = @daily_price,
        deposit = @deposit,
        image_url = @image_url,
        description_ka = @description_ka,
        description_en = @description_en,
        is_active = @is_active
    WHERE id = @id
  `).run({ ...updated, id: numericId });

  return getCarById(numericId);
}

export function deleteCar(id) {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) return false;

  const activeBookings = db.prepare(`
    SELECT COUNT(*) as count FROM bookings
    WHERE car_id = ? AND status IN ('pending', 'confirmed', 'active')
  `).get(numericId);

  if (activeBookings.count > 0) {
    throw Object.assign(
      new Error('ავტომობილის წაშლა შეუძლებელია, რადგან აქვს აქტიური ან მიმდინარე ჯავშნები'),
      { statusCode: 409 }
    );
  }

  const info = db.prepare('DELETE FROM cars WHERE id = ?').run(numericId);
  return info.changes > 0;
}