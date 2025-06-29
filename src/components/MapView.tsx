'use client';
import { useEffect, useState } from 'react';

interface Stop {
  name: string;
  position: [number, number];
}

interface MapViewProps {
  center?: [number, number];
  stops?: Stop[];
}

export default function MapView({ center = [22.5726, 88.3639], stops = [] }: MapViewProps) {
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
  }, []);

  return (
    <div className="px-4 py-3">
      <div className="w-full aspect-[3/2] rounded-xl shadow-lg overflow-hidden relative bg-gray-800" role="application">
        {/* Static Map Diagram */}
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 relative">
          {/* Map Grid Lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
          
          {/* Map Title */}
          <div className="absolute top-3 left-3 bg-white/90 rounded-lg px-3 py-1 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-800">🗺️ Howrah Transit Map</h3>
          </div>
          
          {/* Location Indicator */}
          <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
            📍 {userLocation ? 'Location Found' : 'Getting Location...'}
          </div>
          
          {/* Transit Stops as Dots */}
          <div className="absolute inset-0 p-8">
            {stops.slice(0, 8).map((stop, idx) => {
              const left = 20 + (idx % 4) * 20;
              const top = 30 + Math.floor(idx / 4) * 25;
              return (
                <div key={idx} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg border-2 border-white"></div>
                  <div className="absolute top-4 left-0 bg-black/80 text-white text-xs px-1 py-0.5 rounded whitespace-nowrap">
                    {stop.name.split('→')[0].trim()}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Map Legend */}
          <div className="absolute bottom-3 left-3 bg-white/90 rounded-lg px-3 py-2 shadow-sm">
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Bus Stop</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Train Station</span>
              </div>
            </div>
          </div>
          
          {/* Stop Count */}
          <div className="absolute bottom-3 right-3 bg-white/90 rounded-lg px-3 py-2 shadow-sm">
            <div className="text-xs text-gray-700">
              <strong>{stops.length}</strong> stops found
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
