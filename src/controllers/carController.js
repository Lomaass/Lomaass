import * as carService from '../services/carService.js';

export function listCars(req, res, next) {
  try {
    const cars = carService.getAllCars(req.query);
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      count: cars.length,
      data: cars
    });
  } catch (err) {
    next(err);
  }
}

export function getCar(req, res, next) {
  try {
    const car = carService.getCarById(req.params.id);
    if (!car) {
      return res.status(404).json({
        success: false,
        brand: 'Western - Car Rental',
        message: 'ავტომობილი ვერ მოიძებნა'
      });
    }
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      data: car
    });
  } catch (err) {
    next(err);
  }
}

export function addCar(req, res, next) {
  try {
    const car = carService.createCar(req.body);
    res.status(201).json({
      success: true,
      brand: 'Western - Car Rental',
      data: car
    });
  } catch (err) {
    next(err);
  }
}

export function editCar(req, res, next) {
  try {
    const updated = carService.updateCar(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        success: false,
        brand: 'Western - Car Rental',
        message: 'ავტომობილი ვერ მოიძებნა'
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

export function removeCar(req, res, next) {
  try {
    const deleted = carService.deleteCar(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        brand: 'Western - Car Rental',
        message: 'ავტომობილი ვერ მოიძებნა'
      });
    }
    res.json({
      success: true,
      brand: 'Western - Car Rental',
      message: 'ავტომობილი წარმატებით წაიშალა'
    });
  } catch (err) {
    next(err);
  }
}