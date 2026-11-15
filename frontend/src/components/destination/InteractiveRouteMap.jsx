import { useState } from 'react';
import { useTrip } from '../../context/TripContext.jsx';
import { FALLBACK_DESTINATIONS } from '../../utils/destinationsData.js';
import { MapPin, ArrowRight, Star, Plus, Check } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

// Scaled coordinates relative to SVG viewBox (0 0 800 650)
const MAP_PINS = [
  { slug: 'jaipur', name: 'Jaipur', x: 260, y: 310, state: 'Rajasthan', alt: '431m' },
  { slug: 'udaipur', name: 'Udaipur', x: 210, y: 410, state: 'Rajasthan', alt: '598m' },
  { slug: 'rishikesh', name: 'Rishikesh', x: 380, y: 220, state: 'Uttarakhand', alt: '356m' },
  { slug: 'kedarnath', name: 'Kedarnath', x: 420, y: 170, state: 'Uttarakhand', alt: '3,583m' },
  { slug: 'badrinath', name: 'Badrinath', x: 445, y: 160, state: 'Uttarakhand', alt: '3,133m' },
  { slug: 'jageshwar-dham', name: 'Jageshwar', x: 465, y: 235, state: 'Uttarakhand', alt: '1,870m' },
  { slug: 'almora', name: 'Almora', x: 450, y: 245, state: 'Uttarakhand', alt: '1,638m' },
];

export default function InteractiveRouteMap() {
  const { selectedDestinations, addDestination } = useTrip();
  const [hoveredPin, setHoveredPin] = useState(MAP_PINS[0]);

  const activeDestinationData = FALLBACK_DESTINATIONS.find(d => d?.slug === hoveredPin?.slug) || FALLBACK_DESTINATIONS[0];
  const isSelected = (selectedDestinations || []).some(d => d?.slug === hoveredPin?.slug);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#008CFF] block">
            INTERACTIVE ROUTE MAP & WAYPOINTS
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900">
            Explore Circuit Routes & Stops
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A86B]" /> Selected ({selectedDestinations.length})
          </span>
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-gray-300" /> Available Stops
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-7 relative bg-[#F8FAFC] rounded-xl border border-gray-200 p-4 overflow-hidden aspect-[4/3] flex items-center justify-center shadow-inner">
          {/* Subtle topographical grid */}
          <div
            className="absolute inset-0 opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <svg
            viewBox="100 80 500 420"
            className="w-full h-full relative z-10 select-none"
          >
            {/* Connecting Circuit Paths */}
            <path
              d="M 260 310 L 210 410"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 260 310 L 380 220"
              stroke="#93C5FD"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
            <path
              d="M 380 220 L 420 170 L 445 160"
              stroke="#008CFF"
              strokeWidth="2.5"
              fill="none"
            />
            <path
              d="M 380 220 L 450 245 L 465 235"
              stroke="#60A5FA"
              strokeWidth="2"
              strokeDasharray="3 3"
              fill="none"
            />

            {/* Pins */}
            {MAP_PINS.map((pin) => {
              const pinSelected = (selectedDestinations || []).some(d => d?.slug === pin.slug);
              const isHovered = hoveredPin?.slug === pin.slug;

              return (
                <g
                  key={pin.slug}
                  className="cursor-pointer transition-transform"
                  onClick={() => setHoveredPin(pin)}
                  onMouseEnter={() => setHoveredPin(pin)}
                >
                  {/* Pulse wave when hovered */}
                  {isHovered && (
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r="16"
                      className="fill-[#008CFF]/15 animate-ping"
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={isHovered ? 11 : 8}
                    className={`transition-all duration-200 ${
                      pinSelected
                        ? 'fill-[#00A86B] stroke-white stroke-2 shadow'
                        : isHovered
                        ? 'fill-[#008CFF] stroke-white stroke-2'
                        : 'fill-white stroke-[#008CFF] stroke-2'
                    }`}
                  />

                  {/* Inner dot */}
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r={pinSelected ? 4 : 3}
                    className={pinSelected ? 'fill-white' : isHovered ? 'fill-white' : 'fill-[#008CFF]'}
                  />

                  {/* Label */}
                  <text
                    x={pin.x}
                    y={pin.y - 14}
                    textAnchor="middle"
                    className={`text-[11px] font-bold select-none ${
                      isHovered ? 'fill-[#008CFF] font-extrabold text-[12px]' : 'fill-gray-700'
                    }`}
                  >
                    {pin.name}
                  </text>
                  <text
                    x={pin.x}
                    y={pin.y + 18}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-gray-400 select-none"
                  >
                    {pin.alt}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Destination Preview Card */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-gray-100">
            <img
              src={activeDestinationData.heroImage}
              alt={activeDestinationData.name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-[11px] font-semibold">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span>{activeDestinationData.rating}</span>
            </div>
            <div className="absolute top-2.5 right-2.5">
              <Badge variant="blue">{activeDestinationData.state}</Badge>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black text-gray-900">
              {activeDestinationData.name}
            </h4>
            <span className="text-xs font-semibold text-[#008CFF] block mt-0.5">
              {activeDestinationData.tagline}
            </span>
            <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
              {activeDestinationData.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Avg Daily Cost</span>
              <span className="text-gray-900 font-mono font-bold text-sm">₹{(activeDestinationData?.avgDailyCost || 1800).toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Best Duration</span>
              <span className="text-[#00A86B] font-bold text-sm">{activeDestinationData.avgStayDays} Days</span>
            </div>
          </div>

          <Button
            variant={isSelected ? 'outline' : 'primary'}
            size="md"
            className="w-full mt-2"
            onClick={() => addDestination(activeDestinationData)}
          >
            {isSelected ? (
              <>
                <Check size={16} />
                <span>Stop Added to Trip</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add {activeDestinationData.name} to Trip</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
