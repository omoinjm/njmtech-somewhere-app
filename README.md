================================================================================
                           FLIGHT OPTIMIZATION FRONTEND
================================================================================

A React web application for finding the most cost-efficient flight routes.

--------------------------------------------------------------------------------
INSTALLATION
--------------------------------------------------------------------------------

1. Ensure you have Node.js (v18+) and npm installed.

2. Install dependencies:
   
   npm install

--------------------------------------------------------------------------------
CONFIGURATION
--------------------------------------------------------------------------------

The backend URL defaults to: http://localhost:8000

To change the backend URL, create a .env file in the project root:

   VITE_API_URL=http://your-backend-url:port

Or set the environment variable before running:

   VITE_API_URL=http://your-backend-url:port npm run dev

--------------------------------------------------------------------------------
RUNNING THE APP
--------------------------------------------------------------------------------

Development mode:
   
   npm run dev

   The app will be available at: http://localhost:5173

Production build:

   npm run build
   npm run preview

--------------------------------------------------------------------------------
API ENDPOINT
--------------------------------------------------------------------------------

The frontend calls a single API endpoint:

   POST /api/flight/optimize

Request body:
   {
     "from_city": "London",
     "to_cities": ["Paris", "Berlin", "Rome"]
   }

Response:
   {
     "best_city": "Paris",
     "price_per_km": 0.42,
     "currency": "USD",
     "distance_km": 3421,
     "total_price": 1437
   }

--------------------------------------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------------------------------------

src/
├── components/           # React components
│   ├── FlightForm.tsx    # Input form for cities
│   ├── FlightResult.tsx  # Results display
│   ├── LoadingPlane.tsx  # Loading animation
│   ├── ErrorMessage.tsx  # Error display
│   └── ui/               # UI primitives (Button, Input, etc.)
├── config/
│   └── api.ts            # API configuration
├── services/
│   └── flightService.ts  # API service layer
├── types/
│   └── flight.ts         # TypeScript interfaces
├── pages/
│   └── Index.tsx         # Main page component
└── hooks/                # Custom React hooks

--------------------------------------------------------------------------------
FEATURES
--------------------------------------------------------------------------------

- Departure city input
- Multiple destination cities (comma-separated)
- Loading state with animation
- Error handling with retry option
- Beautiful result display showing:
  - Best city destination
  - Price per kilometer
  - Total distance
  - Total price

--------------------------------------------------------------------------------
TECH STACK
--------------------------------------------------------------------------------

- React 18 (Functional components + Hooks)
- TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- Lucide React (Icons)

================================================================================