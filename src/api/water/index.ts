import express, { Router } from 'express';
import { WaterApi } from './waterApi.js';

const router: Router = express.Router();

export const water = new WaterApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await water.fetch();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
