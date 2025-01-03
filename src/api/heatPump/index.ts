import express, { Router } from 'express';
import { HeatPumpApi } from './heatPumpApi.js';

const router: Router = express.Router();

const heatPumpApi = new HeatPumpApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await heatPumpApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
