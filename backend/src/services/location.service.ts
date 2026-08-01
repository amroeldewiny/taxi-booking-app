export interface JourneyEstimate {
  distanceKm: number;
  durationMinutes: number;
}

export function calculateJourneyEstimate(
  pickupLocation: string,
  destination: string,
): JourneyEstimate {
  const pickup = pickupLocation.trim().toLowerCase();
  const destinationName = destination.trim().toLowerCase();

  const routes: Record<string, number> = {
    'maasmechelen-genk': 18.5,
    'genk-maasmechelen': 18.5,
    'maasmechelen-hasselt': 31.2,
    'hasselt-maasmechelen': 31.2,
    'maasmechelen-maastricht': 22.8,
    'maastricht-maasmechelen': 22.8,
    'genk-hasselt': 15.7,
    'hasselt-genk': 15.7,
  };

  const routeKey = `${pickup}-${destinationName}`;

  const distanceKm =
    routes[routeKey] ??
    generateFallbackDistance(pickup, destinationName);

  return {
    distanceKm,
    durationMinutes: calculateDuration(distanceKm),
  };
}

function generateFallbackDistance(
  pickupLocation: string,
  destination: string,
): number {
  const combinedLength =
    pickupLocation.length + destination.length;

  return 8 + (combinedLength % 38);
}

function calculateDuration(distanceKm: number): number {
  const averageSpeedKmPerHour = 45;
  const drivingMinutes =
    (distanceKm / averageSpeedKmPerHour) * 60;

  return Math.ceil(drivingMinutes + 5);
}