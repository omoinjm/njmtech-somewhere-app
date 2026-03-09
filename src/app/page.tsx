'use client';

import { useState } from 'react';
import { Plane } from 'lucide-react';
import { FlightForm } from '@/components/FlightForm';
import { FlightResult } from '@/components/FlightResult';
import { LoadingPlane } from '@/components/LoadingPlane';
import { ErrorMessage } from '@/components/ErrorMessage';
import { optimizeFlight } from '@/services/flightService';
import type { FlightFormData, FlightOptimizeResponse } from '@/types/flight';
import { useToast } from '@/hooks/use-toast';

export default function IndexPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FlightOptimizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (formData: FlightFormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Parse comma-separated cities
      const toCities = formData.toCities
        .split(',')
        .map((city) => city.trim())
        .filter((city) => city.length > 0);

      if (toCities.length === 0) {
        throw new Error('Please enter at least one destination city');
      }

      const response = await optimizeFlight({
        from_city: formData.fromCity,
        to_cities: toCities,
      });

      setResult(response);
      toast({
        title: 'Route found!',
        description: `Best destination: ${response.best_city}`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to optimize flight route';
      setError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sky-gradient">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex items-center justify-center gap-3">
            <div className="rounded-xl bg-primary-foreground/20 p-3 backdrop-blur-sm">
              <Plane className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
                Flight Optimizer
              </h1>
              <p className="text-sm text-primary-foreground/80">
                Find the most cost-efficient route
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-lg">
          {/* Form Card */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8">
            <FlightForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* Results Section */}
          <div className="mt-8">
            {isLoading && <LoadingPlane />}
            {error && !isLoading && (
              <ErrorMessage message={error} onRetry={handleRetry} />
            )}
            {result && !isLoading && !error && <FlightResult result={result} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Flight Optimization Tool • Powered by Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
