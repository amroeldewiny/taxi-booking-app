import { Component, computed, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { BookingService } from '../../core/services/booking';
import {
  PassengerDetails,
  VehicleType,
} from '../../core/models/booking.model';

@Component({
  selector: 'app-passenger',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './passenger.html',
  styleUrl: './passenger.css',
})
export class Passenger {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookingService =
    inject(BookingService);

  readonly booking = this.bookingService.booking;

  readonly vehicleName = computed(() => {
    const vehicleType = this.booking()?.vehicleType;

    return this.getVehicleName(vehicleType);
  });

  readonly maximumPassengers = computed(() => {
    switch (this.booking()?.vehicleType) {
      case 'minivan':
        return 7;

      case 'standard':
      case 'business':
        return 4;

      default:
        return 1;
    }
  });

  readonly passengerForm =
    this.formBuilder.nonNullable.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],

      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\+?[0-9\s()-]{8,20}$/,
          ),
        ],
      ],

      email: [
        '',
        [
          Validators.email,
          Validators.maxLength(100),
        ],
      ],

      passengerCount: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(
            this.maximumPassengers(),
          ),
        ],
      ],

      specialInstructions: [
        '',
        Validators.maxLength(300),
      ],
    });

  constructor() {
    const existingPassenger =
      this.booking()?.passengerDetails;

    if (existingPassenger) {
      this.passengerForm.patchValue(
        existingPassenger,
      );
    }
  }

  continueToSummary(): void {
    if (this.passengerForm.invalid) {
      this.passengerForm.markAllAsTouched();
      return;
    }

    const passengerDetails: PassengerDetails =
      this.passengerForm.getRawValue();

    this.bookingService.updateBooking({
      passengerDetails,
    });
    
    this.router.navigate(['/summary']);

    //console.log('Complete booking:',this.bookingService.booking(),);

    //alert('Passenger details saved successfully.');
  }

  

  goBack(): void {
    this.router.navigate(['/booking']);
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

  readonly passengerOptions = computed(() =>
    Array.from(
      { length: this.maximumPassengers() },
      (_, index) => index + 1,
    ),
  );
}
