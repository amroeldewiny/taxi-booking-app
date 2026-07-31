import {
  CurrencyPipe,
  DatePipe,
} from '@angular/common';
import {
  Component,
  computed,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  VehicleType,
} from '../../core/models/booking.model';
import {
  BookingService,
} from '../../core/services/booking';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  private readonly bookingService =
    inject(BookingService);

  private readonly router = inject(Router);

  readonly booking = this.bookingService.booking;

  readonly passengerName = computed(() => {
    const passenger =
      this.booking()?.passengerDetails;

    if (!passenger) {
      return 'Customer';
    }

    return `${passenger.firstName} ${passenger.lastName}`;
  });

  readonly vehicleName = computed(() => {
    return this.getVehicleName(
      this.booking()?.vehicleType,
    );
  });

  readonly bookingIsConfirmed = computed(() => {
    const currentBooking = this.booking();

    return Boolean(
      currentBooking &&
      currentBooking.bookingConfirmed &&
      currentBooking.bookingReference,
    );
  });

  bookAnotherTaxi(): void {
    this.bookingService.clearBooking();
    this.router.navigate(['/']);
  }

  private getVehicleName(
    vehicleType?: VehicleType,
  ): string {
    switch (vehicleType) {
      case 'standard':
        return 'Standard Taxi';

      case 'business':
        return 'Business Taxi';

      case 'minivan':
        return 'Minivan';

      default:
        return 'Vehicle unavailable';
    }
  }
}