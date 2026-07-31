import { Injectable } from '@angular/core';

import {
  JourneyEstimate,
} from '../models/journey-estimate.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  getJourneyEstimate(
    pickupLocation: string,
    destination: string,
  ): JourneyEstimate {
    const normalizedPickup =
      pickupLocation.trim().toLowerCase();

    const normalizedDestination =
      destination.trim().toLowerCase();

    const distanceKm = this.calculateMockDistance(
      normalizedPickup,
      normalizedDestination,
    );

    const durationMinutes =
      this.calculateDuration(distanceKm);

    return {
      distanceKm,
      durationMinutes,
    };
  }

  private calculateMockDistance(
    pickupLocation: string,
    destination: string,
  ): number {
    const routes: Record<string, number> = {
      'maasmechelen-genk': 18.5,
      'genk-maasmechelen': 18.5,

      'maasmechelen-hasselt': 31.2,
      'hasselt-maasmechelen': 31.2,

      'maasmechelen-maastricht': 22.8,
      'maastricht-maasmechelen': 22.8,

      'genk-hasselt': 15.7,
      'hasselt-genk': 15.7,

      'genk-maastricht': 33.4,
      'maastricht-genk': 33.4,
    };

    const routeKey =
      `${pickupLocation}-${destination}`;

    return routes[routeKey] ??
      this.generateFallbackDistance(
        pickupLocation,
        destination,
      );
  }

  private generateFallbackDistance(
    pickupLocation: string,
    destination: string,
  ): number {
    const combinedLength =
      pickupLocation.length +
      destination.length;

    const generatedDistance =
      8 + (combinedLength % 38);

    return Number(
      generatedDistance.toFixed(1),
    );
  }

  private calculateDuration(
    distanceKm: number,
  ): number {
    const averageSpeedKmPerHour = 45;

    const drivingMinutes =
      (distanceKm / averageSpeedKmPerHour) * 60;

    const trafficBufferMinutes = 5;

    return Math.ceil(
      drivingMinutes + trafficBufferMinutes,
    );
  }
}