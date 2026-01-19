import { useState } from 'react';
import { Plane, MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FlightFormData } from '@/types/flight';

interface FlightFormProps {
  onSubmit: (data: FlightFormData) => void;
  isLoading: boolean;
}

export function FlightForm({ onSubmit, isLoading }: FlightFormProps) {
  const [fromCity, setFromCity] = useState('');
  const [toCities, setToCities] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCity.trim() && toCities.trim()) {
      onSubmit({ fromCity: fromCity.trim(), toCities: toCities.trim() });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fromCity" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Navigation className="h-4 w-4 text-primary" />
          Departure City
        </Label>
        <Input
          id="fromCity"
          type="text"
          placeholder="e.g., London"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          required
          disabled={isLoading}
          aria-describedby="fromCity-hint"
        />
        <p id="fromCity-hint" className="text-xs text-muted-foreground">
          Enter your departure city
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="toCities" className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          Destination Cities
        </Label>
        <Input
          id="toCities"
          type="text"
          placeholder="e.g., Paris, Berlin, Rome"
          value={toCities}
          onChange={(e) => setToCities(e.target.value)}
          required
          disabled={isLoading}
          aria-describedby="toCities-hint"
        />
        <p id="toCities-hint" className="text-xs text-muted-foreground">
          Separate multiple cities with commas
        </p>
      </div>

      <Button
        type="submit"
        variant="sky"
        size="lg"
        className="w-full"
        disabled={isLoading || !fromCity.trim() || !toCities.trim()}
      >
        {isLoading ? (
          <>
            <Plane className="h-5 w-5 animate-pulse" />
            Finding Best Route...
          </>
        ) : (
          <>
            <Plane className="h-5 w-5" />
            Find Best Flight
          </>
        )}
      </Button>
    </form>
  );
}
