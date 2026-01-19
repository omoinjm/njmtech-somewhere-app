import { Plane } from 'lucide-react';

export function LoadingPlane() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="absolute -inset-4 animate-ping rounded-full bg-primary/20" />
        <div className="relative rounded-full bg-primary/10 p-4">
          <Plane className="h-8 w-8 text-primary animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">
        Searching for the best route...
      </p>
      <div className="mt-2 flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '0ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '150ms' }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-primary" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
