import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'TaxiGo | Reliable Taxi Service',
    loadComponent: () =>
      import('./pages/home/home').then(
        (component) => component.Home,
      ),
  },
  {
    path: 'booking',
    title: 'Review Booking | TaxiGo',
    loadComponent: () =>
      import('./pages/booking/booking').then(
        (component) => component.Booking,
      ),
  },
  {
    path: 'passenger',
    title: 'Passenger Details | TaxiGo',
    loadComponent: () =>
      import('./pages/passenger/passenger').then(
        component => component.Passenger,
      ),
  },
  {
    path: 'summary',
    title: 'Booking Summary | TaxiGo',
    loadComponent: () =>
      import('./pages/summary/summary').then(
        component => component.Summary,
      ),
  },
  {
    path: 'confirmation',
    title: 'Booking Confirmation | TaxiGo',
    loadComponent: () =>
      import('./pages/confirmation/confirmation').then(
        component => component.Confirmation,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];