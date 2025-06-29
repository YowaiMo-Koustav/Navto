import type { Timestamp } from 'firebase/firestore';

export interface ServiceAlert {
  id: string;
  severity: 'warning' | 'info';
  title: string;
  message: string;
  timestamp?: Timestamp;
}

export interface TransitDeparture {
  id:string;
  type: 'bus' | 'train';
  route: string;
  destination: string;
  time: string;
  status: 'On Time' | 'Delayed';
  delay?: string;
  lat: number;
  lng: number;
}
