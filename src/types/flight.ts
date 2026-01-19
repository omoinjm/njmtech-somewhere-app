export interface FlightOptimizeRequest {
  from_city: string;
  to_cities: string[];
}

export interface FlightOptimizeResponse {
  best_city: string;
  price_per_km: number;
  currency: string;
  distance_km: number;
  total_price: number;
}

export interface FlightFormData {
  fromCity: string;
  toCities: string;
}
