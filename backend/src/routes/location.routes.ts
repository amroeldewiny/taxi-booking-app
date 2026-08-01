import { Router, type Request, type Response } from 'express';

import {
  calculateJourneyEstimate,
} from '../services/location.service.js';

export const locationRouter = Router();

locationRouter.post(
  '/',
  (req: Request, res: Response) => {
    const { pickupLocation, destination } = req.body;

    if (
      typeof pickupLocation !== 'string' ||
      typeof destination !== 'string' ||
      !pickupLocation.trim() ||
      !destination.trim()
    ) {
      return res.status(400).json({
        message:
          'Pickup location and destination are required.',
      });
    }

    const estimate = calculateJourneyEstimate(
      pickupLocation,
      destination,
    );

    return res.json(estimate);
  },
);