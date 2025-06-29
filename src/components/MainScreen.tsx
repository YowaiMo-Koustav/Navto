'use client';
import { useState, useEffect } from 'react';
import { UserCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import AccountModal from './AccountModal';
import VoiceAssistant from './VoiceAssistant';
import MapView from './MapView';
import ServiceAlerts from './ServiceAlerts';
import TransitList from './TransitList';
import type { ServiceAlert, TransitDeparture } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { getRealtimeAlerts, getDepartures } from '@/services/firestoreService';
import { Skeleton } from './ui/skeleton';


export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  const [allAlerts, setAllAlerts] = useState<ServiceAlert[]>([]);
  const [departures, setDepartures] = useState<TransitDeparture[]>([]);
  const [relevantAlerts, setRelevantAlerts] = useState<ServiceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = getRealtimeAlerts((alerts) => {
      setAllAlerts(alerts);
      setRelevantAlerts(alerts); // Initially show all alerts
      if (isLoading) setIsLoading(false);
    });

    const fetchDepartures = async () => {
      const fetchedDepartures = await getDepartures();
      setDepartures(fetchedDepartures);
      if (isLoading) setIsLoading(false);
    };

    fetchDepartures();

    return () => unsubscribe();
  }, [isLoading]);

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

        <VoiceAssistant allAlerts={allAlerts} setRelevantAlerts={setRelevantAlerts} />
        
        <MapView />

        <div className="px-4 mt-3">
          <h2 className="font-headline text-foreground text-xl font-semibold leading-tight tracking-tight mb-4">
            Next Departures & Alerts
          </h2>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : (
            <>
              <ServiceAlerts alerts={relevantAlerts} />
              <TransitList departures={departures} />
            </>
          )}
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
