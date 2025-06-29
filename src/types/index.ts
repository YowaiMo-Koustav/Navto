export interface ServiceAlert {
  id: string;
  severity: 'warning' | 'info';
  title: string;
  message: string;
}

export interface TransitDeparture {
  id: string;
  type: 'bus' | 'train';
  route: string;
  destination: string;
  time: string;
  status: 'On Time' | 'Delayed';
  delay?: string;
}
