import { MapPin, DollarSign, Ruler, Wallet } from 'lucide-react';
import type { FlightOptimizeResponse } from '@/types/flight';

interface FlightResultProps {
  result: FlightOptimizeResponse;
}

export function FlightResult({ result }: FlightResultProps) {
  const formatCurrency = (value: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDistance = (km: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(km);
  };

  return (
    <div className="animate-slide-up space-y-6">
      {/* Best City Hero */}
      <div className="result-gradient rounded-xl p-6 text-center text-primary-foreground shadow-lg">
        <p className="text-sm font-medium uppercase tracking-wide opacity-90">
          Best Destination
        </p>
        <h2 className="mt-2 font-display text-4xl font-bold">
          {result.best_city}
        </h2>
        <p className="mt-1 text-sm opacity-80">
          Most cost-efficient route
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<DollarSign className="h-5 w-5" />}
          label="Price per km"
          value={formatCurrency(result.price_per_km, result.currency)}
          sublabel="Cost efficiency"
        />
        <StatCard
          icon={<Ruler className="h-5 w-5" />}
          label="Distance"
          value={`${formatDistance(result.distance_km)} km`}
          sublabel="Total journey"
        />
        <StatCard
          icon={<Wallet className="h-5 w-5" />}
          label="Total Price"
          value={formatCurrency(result.total_price, result.currency)}
          sublabel="Flight cost"
          highlight
          className="col-span-2"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sublabel: string;
  highlight?: boolean;
  className?: string;
}

function StatCard({ icon, label, value, sublabel, highlight, className }: StatCardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 card-elevated ${
        highlight ? 'border-primary/20 bg-primary/5' : ''
      } ${className || ''}`}
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={highlight ? 'text-primary' : ''}>{icon}</span>
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold ${highlight ? 'text-primary' : 'text-foreground'}`}>
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
    </div>
  );
}
