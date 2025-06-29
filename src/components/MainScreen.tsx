'use client';
import { useState } from 'react';
import { UserCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import AccountModal from './AccountModal';
import VoiceAssistant from './VoiceAssistant';
import MapView from './MapView';
import ServiceAlerts from './ServiceAlerts';
import TransitList from './TransitList';
import type { ServiceAlert, TransitDeparture } from '@/types';
import { useAuth } from '@/hooks/use-auth';

// Mock Data
const initialAlerts: ServiceAlert[] = [
  { id: '1', severity: 'warning', title: 'Service Alert: Route 22', message: 'Detour due to construction on Main St. Expect delays.' },
  { id: '2', severity: 'info', title: 'Weekend Schedule', message: 'All train lines will run on a Sunday schedule this weekend.' },
];

const departures: TransitDeparture[] = [
  { id: '1', type: 'bus', time: '10:15 AM', route: 'Route 22', destination: 'To Downtown Station', status: 'On Time' },
  { id: '2', type: 'train', time: '10:20 AM', route: 'Metro Line B', destination: 'To Northwood Mall', status: 'Delayed', delay: '5 min' },
  { id: '3', type: 'bus', time: '10:25 AM', route: 'Route 45', destination: 'To University Campus', status: 'On Time' },
];

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [relevantAlerts, setRelevantAlerts] = useState<ServiceAlert[]>(initialAlerts);
  const { user } = useAuth();
  
  // A real user object would be passed here. For the demo, we are using a mock
  // based on the user's Firebase Auth details.
  const demoUser = user ? {
    name: user.displayName ?? "Alex Johnson",
    email: user.email ?? "alex.johnson@example.com",
    photoURL: user.photoURL ?? 'https://placehold.co/96x96.png',
  } : {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    photoURL: 'https://placehold.co/96x96.png',
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-background text-foreground">
      <div className="flex-grow pb-16">
        <header className="sticky top-0 z-20 flex items-center justify-end p-4 bg-background/80 backdrop-blur-md">
          <Button
            onClick={() => setIsModalOpen(true)}
            variant="ghost"
            size="icon"
            className="rounded-full"
            aria-label="Open account menu"
          >
            <UserCircle2 className="h-7 w-7 text-foreground" />
          </Button>
        </header>

        <VoiceAssistant allAlerts={initialAlerts} setRelevantAlerts={setRelevantAlerts} />
        
        <MapView />

        <div className="px-4 mt-3">
          <h2 className="font-headline text-foreground text-xl font-semibold leading-tight tracking-tight mb-4">
            Next Departures & Alerts
          </h2>
          <ServiceAlerts alerts={relevantAlerts} />
          <TransitList departures={departures} />
        </div>
        <div className="h-8"></div>
      </div>
      
      <AccountModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        user={demoUser}
      />
    </div>
  );
}
