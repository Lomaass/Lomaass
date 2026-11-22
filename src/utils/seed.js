import db from '../config/db.js';

const initialCars = [
  {
    brand: 'BMW',
    model: '520i M Sport',
    year: 2021,
    category: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    seats: 5,
    daily_price: 75,
    deposit: 200,
    image_url: 'https://s1.cdn.autoevolution.com/images-webp/news/this-2021-bmw-540i-m-sport-just-sold-for-26750-and-it-s-probably-a-best-buy-277904-7.jpg.webp',
    description_ka: 'კომფორტული ბიზნეს კლასის სედანი ქალაქში და შორ მანძილზე გადაადგილებისთვის.',
    description_en: 'Comfortable executive sedan suited for city driving and long trips.',
    is_active: 1
  },
  {
    brand: 'Mercedes-Benz',
    model: 'GLE 350 4MATIC',
    year: 2022,
    category: 'SUV',
    transmission: 'Automatic',
    fuel_type: 'Diesel',
    seats: 5,
    daily_price: 110,
    deposit: 300,
    image_url: 'https://media.ed.edmunds-media.com/mercedes-benz/gle-class/2021/oem/2021_mercedes-benz_gle-class_4dr-suv_amg-gle-53_fq_oem_1_1600.jpg',
    description_ka: 'ტევადი და მაღალი გამავლობის SUV მაქსიმალური კომფორტითა და უსაფრთხოებით.',
    description_en: 'Spacious and capable SUV delivering comfort, stability, and safety.',
    is_active: 1
  },
  {
    brand: 'Volkswagen',
    model: 'Passat CC',
    year: 2015,
    category: 'Sedan',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    seats: 5,
    daily_price: 50,
    deposit: 150,
    image_url: 'https://s3-eu-west-1.amazonaws.com/carlover/vehicle_images/4c901884-745c-e572-a959-6cb45d7e56c4/lg-5696de552656e206f1e9.jpg',
    description_ka: 'დახვეწილი სპორტული სედანი რბილი სვლითა და პრაქტიკული სალონით.',
    description_en: 'Sleek four-door coupe sedan with smooth handling and a refined cabin.',
    is_active: 1
  },
  {
    brand: 'Toyota',
    model: 'Corolla Hybrid',
    year: 2021,
    category: 'Economy',
    transmission: 'Automatic',
    fuel_type: 'Hybrid',
    seats: 5,
    daily_price: 45,
    deposit: 120,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2nzfaz0AkcgKIHjDJuO_8-iVVlOuJ-59UT2hkJisLFGUNbQEYo_PRG-WW&s=10',
    description_ka: 'ეკონომიური ჰიბრიდული ავტომობილი დაბალი საწვავის ხარჯით ყოველდღიური სარგებლობისთვის.',
    description_en: 'Fuel-efficient hybrid vehicle built for practical daily travel.',
    is_active: 1
  },
  {
    brand: 'Porsche',
    model: '911 Carrera',
    year: 2022,
    category: 'Luxury',
    transmission: 'Automatic',
    fuel_type: 'Petrol',
    seats: 2,
    daily_price: 190,
    deposit: 500,
    image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNBU5yrz98NJWjy6YNC7IUaeCaGabW-9H-luNHPVm2VDQ04r-g46PwfVo&s=10',
    description_ka: 'პრემიუმ სპორტული ავტომობილი გამორჩეული დინამიკითა და დიზაინით.',
    description_en: 'Luxury performance coupe offering sharp dynamics and iconic styling.',
    is_active: 1
  }
];

export function seed() {
  const existingCount = db.prepare('SELECT COUNT(*) AS count FROM cars').get().count;

  if (existingCount > 0) {
    console.log(`Cars table already has ${existingCount} record(s). Skipping duplicate insert.`);
    return;
  }

  const insertStmt = db.prepare(`
    INSERT INTO cars (
      brand, model, year, category, transmission, fuel_type,
      seats, daily_price, deposit, image_url, description_ka, description_en, is_active
    ) VALUES (
      @brand, @model, @year, @category, @transmission, @fuel_type,
      @seats, @daily_price, @deposit, @image_url, @description_ka, @description_en, @is_active
    )
  `);

  db.exec('BEGIN');
  try {
    for (const car of initialCars) {
      insertStmt.run(car);
    }
    db.exec('COMMIT');
    console.log(`Seeded ${initialCars.length} cars successfully for Western - Car Rental.`);
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

const isDirectRun =
  Boolean(process.argv[1]) &&
  import.meta.url === new URL(`file:///${process.argv[1].replace(/\\/g, '/')}`).href;

if (isDirectRun) {
  seed();
}