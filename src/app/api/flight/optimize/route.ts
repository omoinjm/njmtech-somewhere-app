import { NextRequest, NextResponse } from 'next/server';
import { getLocationByCity, evaluateFlightOption } from '@/lib/kiwi';
import { FlightOptimizeResponse } from '@/types/flight';

export async function POST(req: NextRequest) {
  try {
    const { from_city, to_cities } = await req.json();

    if (!from_city || !to_cities || !Array.isArray(to_cities)) {
      return NextResponse.json(
        { detail: 'Invalid request body' },
        { status: 400 }
      );
    }

    const fromLocation = await getLocationByCity(from_city);
    if (!fromLocation) {
      return NextResponse.json(
        { detail: `Could not find origin city: ${from_city}` },
        { status: 404 }
      );
    }

    // Concurrent evaluation
    const flightTasks = to_cities.map((toCity) => evaluateFlightOption(fromLocation, toCity));
    const potentialFlights = await Promise.all(flightTasks);

    const validFlights = potentialFlights.filter((f): f is NonNullable<typeof f> => f !== null);

    if (validFlights.length === 0) {
      return NextResponse.json(
        { detail: 'No valid flights found for the given destinations.' },
        { status: 404 }
      );
    }

    const bestFlight = validFlights.reduce((min, flight) => 
      flight.price_per_km < min.price_per_km ? flight : min, 
      validFlights[0]
    );

    const result: FlightOptimizeResponse = {
      best_city: bestFlight.to_location.name,
      price_per_km: Number(bestFlight.price_per_km.toFixed(2)),
      currency: bestFlight.currency,
      distance_km: Number(bestFlight.distance_km.toFixed(4)),
      total_price: bestFlight.price,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Optimization error:', error);
    return NextResponse.json(
      { detail: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
