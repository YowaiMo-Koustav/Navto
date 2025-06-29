import Image from 'next/image';

export default function MapView() {
  return (
    <div className="px-4 py-3">
      <div 
        aria-label="Map showing user's area and nearest transit stops" 
        className="w-full aspect-[3/2] rounded-xl shadow-lg overflow-hidden relative" 
        role="application"
      >
        <Image 
          src="https://placehold.co/600x400.png"
          alt="Map of the local area"
          layout="fill"
          objectFit="cover"
          data-ai-hint="city map"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
