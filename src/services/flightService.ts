import { API_ENDPOINTS } from '@/config/api';
import type { FlightOptimizeRequest, FlightOptimizeResponse } from '@/types/flight';

export async function optimizeFlight(data: FlightOptimizeRequest): Promise<FlightOptimizeResponse> {
  const response = await fetch(API_ENDPOINTS.OPTIMIZE_FLIGHT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  return response.json();
}
