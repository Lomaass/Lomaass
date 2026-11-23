import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { seed } from './src/utils/seed.js';

import './src/config/db.js';
import uploadRoutes from './src/routes/uploadRoutes.js';
import carRoutes from './src/routes/carRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import { errorHandler } from './src/middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/upload', uploadRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

// Error Handler
app.use(errorHandler);

seed();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});