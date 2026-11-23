import * as bookingService from '../services/bookingService.js';
import { sendBookingConfirmationEmail } from '../utils/mailer.js';

export async function create(req, res, next) {
  try {
    const { booking, car } = bookingService.createBooking(req.body);

    let emailSent = false;
    try {
      const mailResult = await sendBookingConfirmationEmail(booking, car);
      emailSent = Boolean(mailResult?.sent);
    } catch (mailErr) {
      console.error('Booking confirmation email failed:', {
        message: mailErr?.message,
        code: mailErr?.code,
        response: mailErr?.response
      });
    }

    res.status(201).json({
      success: true,
      brand: 'Western - Car Rental',
      emailSent,
      data: booking
    });
  } catch (err) {
    next(err);
  }
}

export function trackBooking(req, res, next) {
  try {
    const booking = bookingService.getBookingByCode(req.params.code);
    if (!booking) {
      return res.status(404).json({
        success: false,
        brand: 'Western - Car Rental',
        message: 'ჯავშანი მითითებული კოდით ვერ მოიძებნა'
      });
    }
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      data: booking
    });
  } catch (err) {
    next(err);
  }
}

export function listAll(req, res, next) {
  try {
    const bookings = bookingService.getAllBookings(req.query);
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      count: bookings.length,
      data: bookings
    });
  } catch (err) {
    next(err);
  }
}

export function changeStatus(req, res, next) {
  try {
    const updated = bookingService.updateBookingStatus(req.params.id, req.body.status);
    if (!updated) {
      return res.status(404).json({
        success: false,
        brand: 'Western - Car Rental',
        message: 'ჯავშანი ვერ მოიძებნა'
      });
    }
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      data: updated
    });
  } catch (err) {
    next(err);
  }
}