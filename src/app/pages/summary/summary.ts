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
  selector: 'app-summary',
  standalone: true,
  imports: [
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css',
})
export class Summary {
  private readonly bookingService =
    inject(BookingService);

  private readonly router = inject(Router);

  readonly booking = this.bookingService.booking;

  readonly passengerFullName = computed(() => {
    const passenger =
      this.booking()?.passengerDetails;

    if (!passenger) {
      return 'Passenger information unavailable';
    }

    return `${passenger.firstName} ${passenger.lastName}`;
  });

  readonly vehicleName = computed(() => {
    return this.getVehicleName(
      this.booking()?.vehicleType,
    );
  });

  readonly bookingIsComplete = computed(() => {
    const currentBooking = this.booking();

    return Boolean(
      currentBooking &&
      currentBooking.pickupLocation &&
      currentBooking.destination &&
      currentBooking.pickupDate &&
      currentBooking.pickupTime &&
      currentBooking.vehicleType &&
      currentBooking.passengerDetails &&
      currentBooking.estimatedPrice !== undefined,
    );
  });

  changeJourney(): void {
    this.router.navigate(['/']);
  }

  goBackToVehicle(): void {
    this.router.navigate(['/booking']);
  }

  goBack(): void {
    this.router.navigate(['/passenger']);
  }

  private generateBookingReference(): string {

    const random = Math.floor(
        100000 +
        Math.random() * 900000
    );

    return `TX-${random}`;
  }

  confirmBooking(): void {
    if (!this.bookingIsComplete()) {
      return;
    }

    const bookingReference =
        this.generateBookingReference();

        this.bookingService.updateBooking({

            bookingReference,
            bookingConfirmed: true,
            confirmedAt: new Date().toISOString(),

    });
    //console.log('Confirmed booking:',this.booking(),);
    //alert('Booking confirmed. The final confirmation page comes in Step 8.',);
  
    this.router.navigate(['/confirmation']);
  }


  startNewBooking(): void {
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
        return 'No vehicle selected';
    }
  }
}