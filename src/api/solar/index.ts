import express, { Router } from 'express';
import { SolarApi } from './solarApi.js';
import { solarRequestBodySchema } from './solarSchemas.js';
import { ConflictError } from '../../exception/conflictError.js';

const router: Router = express.Router();

const solarApi = new SolarApi();

router.get('/', async (req, res, next) => {
  try {
    const data = await solarApi.fetch();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof ConflictError) {
      return res.status(error.statusCode).json(error);
    } else {
      next(error);
    }
  }
});

router.patch('/', async (req, res, next) => {
  try {
    const body = solarRequestBodySchema.parse(req.body);
    const data = await solarApi.update(body);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
