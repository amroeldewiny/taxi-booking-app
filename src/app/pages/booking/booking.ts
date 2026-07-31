import { CurrencyPipe } from '@angular/common';
import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  VehicleType,
} from '../../core/models/booking.model';
import { BookingService } from '../../core/services/booking';
import { PricingService } from '../../core/services/pricing';
import { LocationService } from '../../core/services/location';

interface VehicleOption {
  type: VehicleType;
  name: string;
  description: string;
  passengers: number;
  luggage: number;
  surcharge: number;
  icon: string;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking {
  private readonly bookingService = inject(BookingService);
  private readonly pricingService = inject(PricingService);
  private readonly locationService = inject(LocationService);
  private readonly router = inject(Router);

  readonly booking = this.bookingService.booking;

  readonly distanceKm = signal(12);

  readonly vehicles: VehicleOption[] = [
    {
      type: 'standard',
      name: 'Standard Taxi',
      description:
        'Comfortable and affordable for everyday trips.',
      passengers: 4,
      luggage: 2,
      surcharge: 0,
      icon: '🚕',
    },
    {
      type: 'business',
      name: 'Business Taxi',
      description:
        'Premium vehicle for business and executive travel.',
      passengers: 4,
      luggage: 3,
      surcharge: 10,
      icon: '🚘',
    },
    {
      type: 'minivan',
      name: 'Minivan',
      description:
        'Extra space for families, groups and luggage.',
      passengers: 7,
      luggage: 5,
      surcharge: 15,
      icon: '🚐',
    },
  ];

  readonly selectedVehicle =
    signal<VehicleOption | null>(null);

  readonly priceCalculation = computed(() => {
    const selectedVehicle =
      this.selectedVehicle();

    const estimate =
      this.journeyEstimate();

    if (!selectedVehicle || !estimate) {
      return null;
    }

    return this.pricingService.calculatePrice(
      estimate.distanceKm,
      selectedVehicle.type,
    );
  });

  readonly totalPrice = computed(
    () => this.priceCalculation()?.totalPrice ?? 0,
  );

  selectVehicle(vehicle: VehicleOption): void {
    this.selectedVehicle.set(vehicle);
  }

  continueToPassenger(): void {
    const selectedVehicle =
      this.selectedVehicle();

    const estimate =
      this.journeyEstimate();

    const price =
      this.priceCalculation();

    if (
      !selectedVehicle ||
      !estimate ||
      !price
    ) {
      return;
    }

    this.bookingService.updateBooking({
      vehicleType: selectedVehicle.type,

      distanceKm:
        estimate.distanceKm,

      estimatedDurationMinutes:
        estimate.durationMinutes,

      baseFare:
        price.baseFare,

      distanceFare:
        price.distanceFare,

      vehicleSurcharge:
        price.vehicleSurcharge,

      estimatedPrice:
        price.totalPrice,
    });

    this.router.navigate(['/passenger']);
  }

  changeBooking(): void {
    this.router.navigate(['/']);
  }

  readonly journeyEstimate = computed(() => {
    const currentBooking = this.booking();

    if (
      !currentBooking?.pickupLocation ||
      !currentBooking.destination
    ) {
      return null;
    }

    return this.locationService.getJourneyEstimate(
      currentBooking.pickupLocation,
      currentBooking.destination,
    );
  });
}