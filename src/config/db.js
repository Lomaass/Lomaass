import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const defaultDbPath = path.resolve(__dirname, '..', '..', 'database.sqlite');
const dbPath = process.env.DB_PATH ? path.resolve(process.env.DB_PATH) : defaultDbPath;

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    category TEXT NOT NULL CHECK(category IN ('Sedan', 'SUV', 'Coupe', 'Luxury', 'Economy')),
    transmission TEXT NOT NULL CHECK(transmission IN ('Automatic', 'Manual')),
    fuel_type TEXT NOT NULL CHECK(fuel_type IN ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
    seats INTEGER NOT NULL DEFAULT 5,
    daily_price REAL NOT NULL CHECK(daily_price > 0),
    deposit REAL NOT NULL DEFAULT 0,
    image_url TEXT NOT NULL,
    description_ka TEXT,
    description_en TEXT,
    is_active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_code TEXT NOT NULL UNIQUE,
    car_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    pickup_location TEXT NOT NULL,
    dropoff_location TEXT NOT NULL,
    delivery_type TEXT NOT NULL DEFAULT 'office',
    payment_method TEXT NOT NULL DEFAULT 'cash',
    delivery_fee REAL NOT NULL DEFAULT 0,
    service_fee REAL NOT NULL DEFAULT 0,
    pickup_date TEXT NOT NULL,
    dropoff_date TEXT NOT NULL,
    total_days INTEGER NOT NULL CHECK(total_days > 0),
    total_price REAL NOT NULL CHECK(total_price > 0),
    status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'active', 'completed', 'cancelled')),
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE RESTRICT
  );
`);

function ensureBookingColumns() {
  const cols = db.prepare('PRAGMA table_info(bookings)').all();
  const existing = new Set(cols.map((c) => c.name));

  const additions = [
    ["delivery_type", "TEXT NOT NULL DEFAULT 'office'"],
    ["payment_method", "TEXT NOT NULL DEFAULT 'cash'"],
    ["delivery_fee", "REAL NOT NULL DEFAULT 0"],
    ["service_fee", "REAL NOT NULL DEFAULT 0"]
  ];

  for (const [colName, colDef] of additions) {
    if (!existing.has(colName)) {
      db.exec(`ALTER TABLE bookings ADD COLUMN ${colName} ${colDef};`);
    }
  }
}

ensureBookingColumns();

export default db;