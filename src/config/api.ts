// API Configuration
// Change this URL to point to your backend server
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  OPTIMIZE_FLIGHT: `${API_BASE_URL}/api/flight/optimize`,
} as const;
