import { AlertTriangle, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import type { ServiceAlert } from '@/types';

interface ServiceAlertsProps {
  alerts: ServiceAlert[];
}

export default function ServiceAlerts({ alerts }: ServiceAlertsProps) {
  if (alerts.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-3 mb-4">
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.severity === 'warning' ? 'destructive' : 'default'}
          className="p-4 rounded-lg shadow-md border-l-4"
          role="alert"
        >
          {alert.severity === 'warning' ? (
            <AlertTriangle className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <AlertTitle className="font-bold">{alert.title}</AlertTitle>
          <AlertDescription>
            {alert.message}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
