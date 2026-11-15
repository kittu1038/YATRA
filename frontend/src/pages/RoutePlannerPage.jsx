import { useState, useMemo } from 'react';
import { useTrip } from '../context/TripContext.jsx';
import { FALLBACK_DESTINATIONS } from '../utils/destinationsData.js';
import {
  Compass,
  ArrowRight,
  Train,
  Bus,
  Plane,
  Car,
  RefreshCw,
  Plus,
  Trash2,
  ArrowDownUp,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  Check
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import toast from 'react-hot-toast';

// Haversine Distance helper
function calculateHaversine(coord1, coord2) {
  if (!coord1 || !coord2) return 150;
  const R = 6371; // Earth radius in km
  const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
  const dLng = (coord2.lng - coord1.lng) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(coord1.lat * (Math.PI / 180)) *
      Math.cos(coord2.lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// 2-Opt TSP Nearest Neighbor Heuristic
function optimizeRouteTSP(stops) {
  if (stops.length <= 2) return stops;
  const visited = [stops[0]];
  const remaining = stops.slice(1);

  while (remaining.length > 0) {
    const current = visited[visited.length - 1];
    let nearestIndex = 0;
    let shortestDist = Infinity;

    for (let i = 0; i < remaining.length; i++) {
      const dist = calculateHaversine(current?.coordinates, remaining[i]?.coordinates);
      if (dist < shortestDist) {
        shortestDist = dist;
        nearestIndex = i;
      }
    }
    visited.push(remaining.splice(nearestIndex, 1)[0]);
  }
  return visited;
}

export default function RoutePlannerPage() {
  const { selectedDestinations, route, setRoute, addDestination } = useTrip();

  const [stops, setStops] = useState(() => {
    if (selectedDestinations?.length > 1) {
      return selectedDestinations;
    }
    return [
      FALLBACK_DESTINATIONS.find(d => d.slug === 'jaipur'),
      FALLBACK_DESTINATIONS.find(d => d.slug === 'udaipur'),
      FALLBACK_DESTINATIONS.find(d => d.slug === 'rishikesh'),
      FALLBACK_DESTINATIONS.find(d => d.slug === 'kedarnath'),
    ].filter(Boolean);
  });

  const [transportMode, setTransportMode] = useState(route?.mode || 'train');
  const [candidateToAdd, setCandidateToAdd] = useState('');

  // Calculate cumulative route segments
  const segments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < stops.length - 1; i++) {
      const from = stops[i];
      const to = stops[i + 1];
      const km = calculateHaversine(from?.coordinates, to?.coordinates);
      segs.push({ from, to, km });
    }
    return segs;
  }, [stops]);

  const totalDistanceKm = segments.reduce((sum, s) => sum + s.km, 0);

  // Transit mode calculations
  const modeEstimates = {
    train: {
      speedKmH: 65,
      costPerKm: 2.2,
      name: 'Indian Railways (Express / Vande Bharat)',
      icon: Train,
    },
    bus: {
      speedKmH: 45,
      costPerKm: 1.8,
      name: 'State Roadways & AC Sleeper Bus',
      icon: Bus,
    },
    drive: {
      speedKmH: 55,
      costPerKm: 5.5,
      name: 'National Highways Road Trip (Self Drive)',
      icon: Car,
    },
    flight: {
      speedKmH: 450,
      costPerKm: 8.5,
      name: 'Regional Domestic Aviation',
      icon: Plane,
    },
  };

  const currentModeData = modeEstimates[transportMode];
  const totalTravelHours = Math.round((totalDistanceKm / currentModeData.speedKmH) * 10) / 10;
  const estimatedTransitCost = Math.round(totalDistanceKm * currentModeData.costPerKm);

  const handleOptimizeTSP = () => {
    const optimized = optimizeRouteTSP([...stops]);
    setStops(optimized);
    setRoute({
      stops: optimized,
      mode: transportMode,
      totalDistanceKm,
      estimatedCost: estimatedTransitCost,
    });
    toast.success('Route optimized for shortest distance!');
  };

  const handleRemoveStop = (index) => {
    if (stops.length <= 2) {
      toast.error('Minimum 2 stops required for route calculations');
      return;
    }
    const updated = stops.filter((_, i) => i !== index);
    setStops(updated);
  };

  const handleAddStop = () => {
    if (!candidateToAdd) return;
    const dest = FALLBACK_DESTINATIONS.find(d => d.slug === candidateToAdd);
    if (dest && !stops.some(s => s.slug === dest.slug)) {
      setStops([...stops, dest]);
      setCandidateToAdd('');
      toast.success(`${dest.name} added to circuit`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb & Title */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
              <span>Home</span>
              <span>/</span>
              <span>Route Optimizer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Multi-Modal Route & Waypoint Matrix
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1 leading-relaxed">
              Calculate optimal stop sequences, compare train vs bus travel times, and preview distance telemetry.
            </p>
          </div>

          <button
            onClick={handleOptimizeTSP}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Optimize Order (TSP)</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Total Distance</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#008CFF]">
              {totalDistanceKm} km
            </div>
            <span className="text-[10px] text-gray-500 block">Across {segments.length} highway legs</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Transit Time</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-gray-900">
              ~{totalTravelHours} hrs
            </div>
            <span className="text-[10px] text-gray-500 block">Via {currentModeData.name.split(' ')[0]}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Estimated Fare</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#00A86B]">
              ₹{(estimatedTransitCost || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-gray-500 block">Based on realistic IRCTC / State rates</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Waypoints</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-gray-900">
              {stops.length} Stops
            </div>
            <span className="text-[10px] text-gray-500 block">Ordered circuit</span>
          </div>
        </div>

        {/* Transport Mode Switcher */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-3">
            Select Transit Mode
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(modeEstimates).map(([key, data]) => {
              const Icon = data.icon;
              const isSelected = transportMode === key;
              return (
                <button
                  key={key}
                  onClick={() => setTransportMode(key)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#008CFF] shadow-xs'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={18} className={isSelected ? 'text-[#008CFF]' : 'text-gray-400'} />
                    {isSelected && <span className="w-2 h-2 rounded-full bg-[#008CFF]" />}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isSelected ? 'text-[#008CFF]' : 'text-gray-900'}`}>
                      {data.name.split('(')[0]}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-500 block mt-0.5">
                      ₹{data.costPerKm}/km • {data.speedKmH} km/h
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Stops & Segments List */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
            <div>
              <h3 className="font-black text-lg text-gray-900">Waypoint Circuit Queue</h3>
              <p className="text-xs text-gray-500">Stops ordered from origin to destination</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={candidateToAdd}
                onChange={(e) => setCandidateToAdd(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700"
              >
                <option value="">Select destination to add...</option>
                {FALLBACK_DESTINATIONS.filter(d => !stops.some(s => s.slug === d.slug)).map((dest) => (
                  <option key={dest.slug} value={dest.slug}>{dest.name} ({dest.state})</option>
                ))}
              </select>
              <button
                onClick={handleAddStop}
                disabled={!candidateToAdd}
                className="px-3 py-2 bg-[#008CFF] disabled:bg-gray-200 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                + Add Stop
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {stops.map((stop, idx) => (
              <div
                key={stop.slug}
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-[#008CFF] font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">{stop.name}</h4>
                    <span className="text-[11px] text-gray-500 capitalize">{stop.state} • {stop.type}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {idx < segments.length && (
                    <span className="text-xs font-mono font-bold text-[#008CFF]">
                      → {segments[idx].km} km
                    </span>
                  )}
                  <button
                    onClick={() => handleRemoveStop(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                    title="Remove stop"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
