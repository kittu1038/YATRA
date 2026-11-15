import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FALLBACK_DESTINATIONS, FALLBACK_STAYS, FALLBACK_FOODS } from '../utils/destinationsData.js';
import { useTrip } from '../context/TripContext.jsx';
import {
  MapPin,
  Calendar,
  Clock,
  Compass,
  Star,
  CheckCircle,
  Plus,
  ArrowRight,
  Shield,
  Sun,
  CloudRain,
  Snowflake,
  Utensils,
  Bed,
  Layers,
  ChevronLeft,
  Check,
  Sparkles
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Tabs from '../components/ui/Tabs.jsx';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { addDestination, addStay, selectedDestinations, selectedStays } = useTrip();

  const destination = FALLBACK_DESTINATIONS.find(d => d.slug === slug) || FALLBACK_DESTINATIONS[0];
  const relatedStays = FALLBACK_STAYS.filter(s => s.destinationSlug === destination.slug);
  const relatedFoods = FALLBACK_FOODS.filter(f => f.destinationSlug === destination.slug);

  const isDestinationAdded = (selectedDestinations || []).some(d => d._id === destination._id || d.slug === destination.slug);

  const tabs = [
    { id: 'overview', label: 'Overview & Heritage', icon: Compass },
    { id: 'places', label: 'Key Highlights', icon: Layers, count: destination.highlights.length },
    { id: 'stays', label: 'Stays', icon: Bed, count: relatedStays.length },
    { id: 'food', label: 'Cuisine & Dhabas', icon: Utensils, count: relatedFoods.length },
    { id: 'weather', label: 'Climate & Best Time', icon: Sun },
    { id: 'etiquette', label: 'Etiquette & Rituals', icon: Shield },
  ];

  return (
    <div className="w-full bg-[#F2F4F7] min-h-screen">
      {/* 1. HERO HEADER */}
      <section className="relative w-full bg-[#0A192F] min-h-[45vh] sm:min-h-[55vh] flex flex-col justify-end">
        {/* Background Image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${destination.heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-black/30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-10 sm:py-14 w-full">
          <Link
            to="/destinations"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-200 hover:text-white transition-colors mb-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full"
          >
            <ChevronLeft size={14} /> Back to Catalog
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-[#008CFF] text-white text-xs font-bold uppercase tracking-wider">
                  {destination.type}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                  {destination.state}
                </span>
                {destination.elevation > 0 && (
                  <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
                    {destination.elevation}m Altitude
                  </span>
                )}
                <span className="flex items-center gap-1 text-xs font-bold text-white bg-[#00A86B] px-2.5 py-0.5 rounded-full shadow">
                  <Star size={12} className="fill-white" /> {destination.rating} ({destination.reviewCount} reviews)
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                {destination.name}
              </h1>
              <p className="text-sm sm:text-base text-blue-100 font-medium">
                {destination.tagline}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => addDestination(destination)}
                className={`px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer ${
                  isDestinationAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white hover:shadow-lg'
                }`}
              >
                {isDestinationAdded ? (
                  <>
                    <Check size={16} />
                    <span>Stop in Trip</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Add to Active Trip</span>
                  </>
                )}
              </button>
              <Link
                to={`/ai-planner?prompt=${encodeURIComponent(`Plan a 3-day itinerary for ${destination.name}`)}`}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold backdrop-blur-xs transition-colors flex items-center gap-2"
              >
                <Sparkles size={16} className="text-[#53B2FE]" />
                <span>AI Planner</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Data Bar */}
        <div className="border-t border-white/10 bg-[#0A192F]/90 backdrop-blur-md relative z-10 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">COORDINATES</span>
              <span className="text-white font-medium">
                {destination.coordinates?.lat}° N, {destination.coordinates?.lng}° E
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">ENTRY CHARGES</span>
              <span className="text-white font-medium">
                ₹{destination.entryFee.indian} (Indians) / ₹{destination.entryFee.foreign} (Foreign)
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">SANCTUM TIMINGS</span>
              <span className="text-white font-medium">
                {destination.timings.open} – {destination.timings.close}
              </span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px] uppercase font-bold">RECOMMENDED STAY</span>
              <span className="text-[#00A86B] font-bold">
                {destination.avgStayDays} Days Minimum
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABS NAVIGATION */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-[#008CFF] border border-blue-200 shadow-xs'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={14} className={isActive ? 'text-[#008CFF]' : 'text-gray-400'} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#008CFF] text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TAB CONTENT VIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mb-3">
                  Architectural & Cultural Heritage
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  {destination.description}
                </p>

                {/* Photo Strip */}
                {destination.images && destination.images.length > 0 && (
                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#008CFF] mb-3">
                      Destination Gallery
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {destination.images.map((img, i) => (
                        <div key={i} className="aspect-[16/10] rounded-xl overflow-hidden border border-gray-100 shadow-xs">
                          <img
                            src={img}
                            alt={`${destination.name} ${i}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80';
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Facts */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#008CFF] block">
                  TRIP PLANNER SYNC
                </span>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Avg Daily Cost</span>
                    <span className="font-mono font-black text-gray-900">₹{destination.avgDailyCost}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Best Season</span>
                    <span className="font-semibold text-[#00A86B]">{destination.bestSeason}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Status</span>
                    <span className="font-semibold text-blue-600">Active Pilgrim Route</span>
                  </div>
                </div>

                <button
                  onClick={() => addDestination(destination)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow hover:shadow-md cursor-pointer transition-all"
                >
                  {isDestinationAdded ? 'Already Added' : 'Add to Active Trip'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Highlights */}
        {activeTab === 'places' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destination.highlights.map((highlight, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#008CFF] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-base text-gray-900">{highlight.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{highlight.description}</p>
                <div className="text-[11px] font-mono text-[#008CFF] pt-2">
                  Timing: {highlight.timings || 'Sunrise to Sunset'}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab: Stays */}
        {activeTab === 'stays' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedStays.map((stay) => {
              const isStaySelected = (selectedStays || []).some(s => s.id === stay.id);
              return (
                <div key={stay.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="aspect-[16/10] relative">
                    <img src={stay.heroImage} alt={stay.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      ★ {stay.rating}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-base text-gray-900">{stay.name}</h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{stay.description}</p>
                    </div>
                    <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-gray-900">₹{stay.pricePerNight} / night</span>
                      <button
                        onClick={() => addStay(stay)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          isStaySelected ? 'bg-emerald-50 text-[#00A86B]' : 'bg-[#008CFF] text-white'
                        }`}
                      >
                        {isStaySelected ? 'Added' : '+ Book'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab: Food */}
        {activeTab === 'food' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedFoods.map((food) => {
              const priceText = typeof food.priceRange === 'object' && food.priceRange
                ? `${food.priceRange.min} - ₹${food.priceRange.max}`
                : (food.priceRange || '150 - 450');

              return (
              <div key={food._id || food.id || food.name} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex items-center gap-3">
                <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">{food.name}</h4>
                  <p className="text-xs text-gray-500">{food.address || food.famousSpot || 'Famous Local Spot'}</p>
                  <span className="text-xs font-mono font-bold text-[#008CFF] mt-1 block">₹{priceText}</span>
                </div>
              </div>
            );
            })}
          </div>
        )}

        {/* Tab: Weather */}
        {activeTab === 'weather' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-black text-xl text-gray-900">Seasonal Climate Breakdown</h3>
            <p className="text-sm text-gray-600">
              Best season: <span className="font-bold text-[#00A86B]">{destination.bestSeason}</span>. Please check official opening and closing dates for high-altitude temples.
            </p>
          </div>
        )}

        {/* Tab: Etiquette */}
        {activeTab === 'etiquette' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="font-black text-xl text-gray-900">Temple Etiquette & Sacred Protocols</h3>
            <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
              <li>Dress modestly covering shoulders and knees before entering sanctum sanctorum.</li>
              <li>Remove leather belts, shoes, and photography gadgets where specified.</li>
              <li>Strictly avoid plastic wrappers and maintain sanctity of holy rivers and kunds.</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
