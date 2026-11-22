# Western - Car Rental

Full-stack car rental web application built with **Node.js**, **Express**, **SQLite (`node:sqlite`)**, and a responsive vanilla **HTML / CSS / JavaScript** frontend with bilingual support (**Georgian / English**).

## Live Demo

- **Application:** https://lomaass.onrender.com
- **API Endpoint:** https://lomaass.onrender.com/api/cars

> Note: On free-tier hosting, the first request after a period of inactivity may take a few seconds to wake up the instance.

## Key Features

- **Vehicle Catalog & Filtering:** Browse vehicles and filter by category, transmission, pickup/dropoff dates, maximum daily price, and search query.
- **Reservation & Live Price Calculation:** Book available cars with pickup/dropoff details, automatic day/price calculation, and unique booking reference codes (`WCR-XXXXXX`).
- **Booking Lookup:** Look up existing reservations by booking code.
- **Admin Management:** `ADMIN_KEY`-protected admin endpoints/view for managing bookings.
- **Bilingual UI (`KA` / `EN`):** Instant language switching across navigation, filters, modals, and status messages.
- **Automatic Database Initialization & Seeding:** Initializes SQLite tables (`cars`, `bookings`) and seeds sample vehicles automatically when starting the server on an empty database (`src/utils/seed.js`).

## Tech Stack

- **Runtime & Framework:** Node.js (ES Modules), Express
- **Database:** SQLite (`node:sqlite` / `DatabaseSync`)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript, Google Fonts (`Plus Jakarta Sans`, `Noto Sans Georgian`)
- **Configuration & Tooling:** `dotenv`, `cors`, Git, Render

## Project Structure

```text
├── public/               # Static frontend assets (HTML, CSS, JS)
├── src/
│   ├── config/           # Database connection & schema initialization (db.js)
│   ├── middleware/       # Error handling & auth/admin middleware
│   ├── routes/           # API route definitions (carRoutes.js, bookingRoutes.js)
│   ├── services/         # Business logic (carService.js, bookingService.js)
│   └── utils/            # Database seeding script (seed.js)
├── .env.example          # Environment variables template
├── .gitignore
├── package.json
└── server.js             # Express entry point & startup seed trigger
