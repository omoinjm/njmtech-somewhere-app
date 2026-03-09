import type { FlightOptimizeRequest, FlightOptimizeResponse } from '@/types/flight';

export async function optimizeFlight(data: FlightOptimizeRequest): Promise<FlightOptimizeResponse> {
  const response = await fetch('/api/flight/optimize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}
