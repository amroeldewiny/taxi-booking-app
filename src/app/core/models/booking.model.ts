export type VehicleType =
  | 'standard'
  | 'business'
  | 'minivan';

export interface PassengerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  passengerCount: number;
  specialInstructions: string;
}

export interface BookingDetails {
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  pickupTime: string;

  vehicleType?: VehicleType;

  distanceKm?: number;
  estimatedDurationMinutes?: number;

  baseFare?: number;
  distanceFare?: number;
  vehicleSurcharge?: number;
  estimatedPrice?: number;

  passengerDetails?: PassengerDetails;

  bookingReference?: string;
  bookingConfirmed?: boolean;
  confirmedAt?: string;
}