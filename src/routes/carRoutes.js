import { Router } from 'express';
import {
  listCars,
  getCar,
  addCar,
  editCar,
  removeCar
} from '../controllers/carController.js';
import { requireAdmin } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', listCars);
router.get('/:id', getCar);
router.post('/', requireAdmin, addCar);
router.patch('/:id', requireAdmin, editCar);
router.delete('/:id', requireAdmin, removeCar);

export default router;