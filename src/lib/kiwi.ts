import haversine from 'haversine';

const KIWI_API_KEY = process.env.KIWI_API_KEY;
const KIWI_API_URL = 'https://tequila-api.kiwi.com';

export interface Location {
  name: string;
  code: string;
  lat: number;
  lon: number;
}

export interface Flight {
  from_location: Location;
  to_location: Location;
  price: number;
  currency: string;
  distance_km: number;
  price_per_km: number;
}

export async function getLocationByCity(cityName: string): Promise<Location | null> {
  if (!KIWI_API_KEY) throw new Error('KIWI_API_KEY is not configured');

  const url = new URL(`${KIWI_API_URL}/locations/query`);
  url.searchParams.append('term', cityName);
  url.searchParams.append('location_types', 'airport');
  url.searchParams.append('limit', '1');
  url.searchParams.append('active_only', 'true');

  const response = await fetch(url.toString(), {
    headers: { 'apikey': KIWI_API_KEY },
  });

  if (!response.ok) return null;

  const data = await response.json();
  if (!data.locations || data.locations.length === 0) return null;

  const locationData = data.locations[0];
  return {
    name: locationData.name,
    code: locationData.code,
    lat: locationData.location.lat,
    lon: locationData.location.lon,
  };
}

export async function findCheapestFlight(fromCode: string, toCode: string): Promise<number | null> {
  if (!KIWI_API_KEY) throw new Error('KIWI_API_KEY is not configured');

  const url = new URL(`${KIWI_API_URL}/v2/search`);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const formatDate = (date: Date) => {
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  };

  url.searchParams.append('fly_from', fromCode);
  url.searchParams.append('fly_to', toCode);
  url.searchParams.append('date_from', formatDate(tomorrow));
  url.searchParams.append('date_to', formatDate(sevenDaysFromNow));
  url.searchParams.append('partner_market', 'us');
  url.searchParams.append('curr', 'USD');
  url.searchParams.append('sort', 'price');
  url.searchParams.append('limit', '1');

  const response = await fetch(url.toString(), {
    headers: { 'apikey': KIWI_API_KEY },
  });

  if (!response.ok) return null;

  const data = await response.json();
  if (!data.data || data.data.length === 0) return null;

  return data.data[0].price;
}

export async function evaluateFlightOption(fromLocation: Location, toCity: string): Promise<Flight | null> {
  const toLocation = await getLocationByCity(toCity);
  if (!toLocation) return null;

  const price = await findCheapestFlight(fromLocation.code, toLocation.code);
  if (price === null) return null;

  const start = { latitude: fromLocation.lat, longitude: fromLocation.lon };
  const end = { latitude: toLocation.lat, longitude: toLocation.lon };
  
  const distanceKm = haversine(start, end, { unit: 'km' });

  if (distanceKm === 0) return null;

  const pricePerKm = price / distanceKm;

  return {
    from_location: fromLocation,
    to_location: toLocation,
    price,
    currency: 'USD',
    distance_km: distanceKm,
    price_per_km: pricePerKm,
  };
}
