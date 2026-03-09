# Flight Optimizer ✈️

A modern, high-performance web application built with **Next.js** to find the most cost-efficient flight routes based on price per kilometer.

## 🚀 Features

- **Next.js Backend:** API logic is handled directly within Next.js API Routes, eliminating the need for an external Python server.
- **Turbopack:** Ultra-fast development builds and HMR.
- **Optimal Route Calculation:** Calculates distance using the Haversine formula to determine the "Best Value" (Price/KM).
- **Modern UI:** Built with **shadcn/ui**, **Tailwind CSS**, and **Framer Motion** for smooth animations.
- **Type Safe:** Fully implemented in TypeScript.
- **Robust Testing:** Integrated **Playwright** for end-to-end testing.

## 🛠️ Tech Stack

- **Frontend/Backend:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Testing:** [Playwright](https://playwright.dev/)
- **API:** [Kiwi Tequila API](https://tequila.kiwi.com/)

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18.17 or later
- A Kiwi Tequila API Key

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Kiwi API Key:
```env
KIWI_API_KEY=your_api_key_here
```

### 4. Development
Run the development server with Turbopack:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 5. Production
Build the application for production:
```bash
npm run build
npm run start
```

## 🧪 Testing

Run End-to-End tests using Playwright:
```bash
# Install browsers (first time only)
npx playwright install

# Run tests
npm run test
```

## 📂 Project Structure

- `src/app/` - Next.js App Router (Pages & API Routes)
- `src/components/` - React components (UI and Feature-based)
- `src/lib/` - Shared utilities and Kiwi API integration logic
- `src/services/` - Frontend service layer for API calls
- `src/types/` - TypeScript definitions
- `tests/` - Playwright E2E tests

## 📄 License

This project is for educational/interview purposes.
