export function requireAdmin(req, res, next) {
  const providedKey = req.header('x-admin-key');
  const expectedKey = process.env.ADMIN_KEY;

  if (!expectedKey) {
    return res.status(500).json({
      success: false,
      brand: 'Western - Car Rental',
      message: 'ADMIN_KEY კონფიგურაცია არ არის მითითებული .env ფაილში'
    });
  }

  if (!providedKey || providedKey !== expectedKey) {
    return res.status(401).json({
      success: false,
      brand: 'Western - Car Rental',
      message: 'არასწორი ან არარსებული Admin გასაღები'
    });
  }

  return next();
}

export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;
  const message =
    statusCode >= 500
      ? 'სერვერის შიდა შეცდომა'
      : err.message || 'მოთხოვნის დამუშავების შეცდომა';

  if (statusCode >= 500) {
    console.error('[Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    brand: 'Western - Car Rental',
    message
  });
}

export default errorHandler;