import { AlertTriangle, Info } from 'lucide-react';
import { Card } from './ui/card';
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
        <Card
          key={alert.id}
          className={`p-4 border-l-4 rounded-lg shadow-md ${
            alert.severity === 'warning'
              ? 'bg-red-900/30 border-red-500 text-red-300'
              : 'bg-blue-900/30 border-blue-500 text-blue-300'
          }`}
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              {alert.severity === 'warning' ? (
                <AlertTriangle className="mr-3 text-red-400" />
              ) : (
                <Info className="mr-3 text-blue-400" />
              )}
            </div>
            <div>
              <p className="font-bold">{alert.title}</p>
              <p className="text-sm">{alert.message}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
