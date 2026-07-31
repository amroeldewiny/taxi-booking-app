import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from '../../core/services/booking';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly bookingService = inject(BookingService);

  readonly bookingForm = this.formBuilder.nonNullable.group({
    pickupLocation: ['', Validators.required],
    destination: ['', Validators.required],
    pickupDate: ['', Validators.required],
    pickupTime: ['', Validators.required],
  });

  bookTaxi(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    this.bookingService.setBooking(
      this.bookingForm.getRawValue(),
    );

    this.router.navigate(['/booking']);
  }
}