import { Bus, TrainFront } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import type { TransitDeparture } from '@/types';

interface TransitListProps {
  departures: TransitDeparture[];
}

export default function TransitList({ departures }: TransitListProps) {
  return (
    <div className="space-y-3">
      {departures.map((departure) => (
        <Card key={departure.id} className="bg-card hover:bg-secondary/50 transition-colors border-0">
          <CardContent className="p-4 flex items-center gap-4">
            <div className={cn(
              "flex items-center justify-center rounded-full shrink-0 size-12",
              departure.type === 'bus' ? 'text-primary bg-blue-900/40' : 'text-accent bg-green-900/40'
            )}>
              {departure.type === 'bus' ? <Bus /> : <TrainFront />}
            </div>
            <div className="flex-grow">
              <p className="text-foreground text-base font-medium">{departure.time} - {departure.route}</p>
              <p className="text-muted-foreground text-sm">{departure.destination}</p>
            </div>
            <p className={cn("font-semibold text-sm", 
              departure.status === 'On Time' ? 'text-accent' : 'text-orange-400'
            )}>
              {departure.status === 'Delayed' ? `${departure.delay} delay` : departure.status}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
