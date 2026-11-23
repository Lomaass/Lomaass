import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { requireAdmin } from '../middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase() || '.jpg';
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext) ? ext : '.jpg';
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}${safeExt}`;
    cb(null, unique);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      const err = new Error('მხოლოდ სურათის ფაილების ატვირთვაა დაშვებული');
      err.statusCode = 400;
      cb(err);
    }
  }
});

const router = Router();

router.post('/', requireAdmin, upload.single('image'), (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'ფაილი არ არის ატვირთული'
      });
    }

    return res.status(201).json({
      success: true,
      image_url: `/uploads/${req.file.filename}`
    });
  } catch (err) {
    return next(err);
  }
});

export default router;

