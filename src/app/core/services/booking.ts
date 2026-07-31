import { Injectable, signal } from '@angular/core';
import { BookingDetails } from '../models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly storageKey = 'taxi-booking';

  private readonly bookingState =
    signal<BookingDetails | null>(this.loadBooking());

  readonly booking = this.bookingState.asReadonly();

  setBooking(booking: BookingDetails): void {
    this.bookingState.set(booking);

    sessionStorage.setItem(
      this.storageKey,
      JSON.stringify(booking),
    );
  }

  updateBooking(
    changes: Partial<BookingDetails>,
  ): void {
    const currentBooking = this.bookingState();

    if (!currentBooking) {
      return;
    }

    this.setBooking({
      ...currentBooking,
      ...changes,
    });
  }

  clearBooking(): void {
    this.bookingState.set(null);
    sessionStorage.removeItem(this.storageKey);
  }

  private loadBooking(): BookingDetails | null {
    const savedBooking =
      sessionStorage.getItem(this.storageKey);

    if (!savedBooking) {
      return null;
    }

    try {
      return JSON.parse(savedBooking) as BookingDetails;
    } catch {
      sessionStorage.removeItem(this.storageKey);
      return null;
    }
  }
}