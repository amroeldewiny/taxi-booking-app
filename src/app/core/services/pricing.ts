import { Injectable } from '@angular/core';
import { VehicleType } from '../models/booking.model';

export interface PriceCalculation {
  distanceKm: number;
  baseFare: number;
  distanceFare: number;
  vehicleSurcharge: number;
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private readonly baseFare = 5;
  private readonly pricePerKm = 2;

  calculatePrice(
    distanceKm: number,
    vehicleType: VehicleType,
  ): PriceCalculation {
    const distanceFare = distanceKm * this.pricePerKm;
    const vehicleSurcharge =
      this.getVehicleSurcharge(vehicleType);

    const totalPrice =
      this.baseFare +
      distanceFare +
      vehicleSurcharge;

    return {
      distanceKm,
      baseFare: this.baseFare,
      distanceFare,
      vehicleSurcharge,
      totalPrice,
    };
  }

  private getVehicleSurcharge(
    vehicleType: VehicleType,
  ): number {
    switch (vehicleType) {
      case 'standard':
        return 0;

      case 'business':
        return 10;

      case 'minivan':
        return 15;

      default:
        return 0;
    }
  }
}