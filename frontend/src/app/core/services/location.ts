import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  JourneyEstimate,
} from '../models/journey-estimate.model';

interface JourneyEstimateRequest {
  pickupLocation: string;
  destination: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly http = inject(HttpClient);

  getJourneyEstimate(
    pickupLocation: string,
    destination: string,
  ): Observable<JourneyEstimate> {
    const request: JourneyEstimateRequest = {
      pickupLocation,
      destination,
    };

    return this.http.post<JourneyEstimate>(
      '/api/location',
      request,
    );
  }
}