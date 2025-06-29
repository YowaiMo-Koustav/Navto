'use client';
import { useState, useEffect } from 'react';
import { UserCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import AccountModal from './AccountModal';
import dynamic from 'next/dynamic';
import ServiceAlerts from './ServiceAlerts';
import TransitList from './TransitList';
import type { ServiceAlert, TransitDeparture } from '@/types';
import { useAuth } from '@/hooks/use-auth';
import { getRealtimeAlerts, getDepartures } from '@/services/firestoreService';
import { Skeleton } from './ui/skeleton';

const MapViewComponent = dynamic(() => import('./MapView'), { ssr: false });

export default function MainScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  
  const [allAlerts, setAllAlerts] = useState<ServiceAlert[]>([]);
  const [departures, setDepartures] = useState<TransitDeparture[]>([]);
  const [relevantAlerts, setRelevantAlerts] = useState<ServiceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stops, setStops] = useState<{ name: string; position: [number, number] }[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }

    const unsubscribe = getRealtimeAlerts((alerts) => {
      setAllAlerts(alerts);
      setRelevantAlerts(alerts); // Initially show all alerts
      if (isLoading) setIsLoading(false);
    });

    const fetchDepartures = async () => {
      const fetchedDepartures = await getDepartures();
      setDepartures(fetchedDepartures);
      // Filter for stops with lat/lng and city === 'Howrah'
      const stopsData = fetchedDepartures
        .filter(dep => typeof dep.lat === 'number' && typeof dep.lng === 'number' && (dep as any).city === 'Howrah')
        .map(dep => ({
          name: `${dep.route} → ${dep.destination}`,
          position: [dep.lat, dep.lng] as [number, number],
        }));
      setStops(stopsData);
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
