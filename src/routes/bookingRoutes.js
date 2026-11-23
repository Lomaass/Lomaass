import { Router } from 'express';
import {
  create,
  trackBooking,
  listAll,
  changeStatus
} from '../controllers/bookingController.js';
import { requireAdmin } from '../middleware/errorHandler.js';
import uploadRoutes from './src/routes/uploadRoutes.js';

const router = Router();

router.post('/', create);
router.get('/track/:code', trackBooking);
router.get('/', requireAdmin, listAll);
router.patch('/:id/status', requireAdmin, changeStatus);

export default router;