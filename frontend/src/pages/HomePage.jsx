import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FALLBACK_DESTINATIONS, FALLBACK_STAYS, FALLBACK_FOODS } from '../utils/destinationsData.js';
import { useTrip } from '../context/TripContext.jsx';
import InteractiveRouteMap from '../components/destination/InteractiveRouteMap.jsx';
import {
  Compass,
  ArrowRight,
  Sparkles,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle,
  Star,
  ChevronRight,
  Shield,
  Clock,
  Layers,
  CloudSun,
  Snowflake,
  ShieldAlert,
  Zap,
  TrendingUp,
  Cpu,
  BedDouble,
  Route,
  Bot,
  Scroll,
  Camera,
  Users,
  Search,
  Check,
  ChevronDown
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import toast from 'react-hot-toast';

const DEFAULT_IMG_FALLBACK = 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('explore');

  // Input states
  const [destinationInput, setDestinationInput] = useState('Kedarnath, Uttarakhand');
  const [originInput, setOriginInput] = useState('Haridwar / Rishikesh');
  const [datesInput, setDatesInput] = useState('May 15 - May 20, 2026');
  const [travellersInput, setTravellersInput] = useState('2 Travellers • Budget ₹15k');

  // Dropdown toggles
  const [openDropdown, setOpenDropdown] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addDestination, selectedDestinations } = useTrip();
  const navigate = useNavigate();

  const categoryTabs = [
    { id: 'explore', label: 'Explore Places', icon: Compass, targetUrl: '/destinations', btnLabel: 'SEARCH DESTINATIONS' },
    { id: 'hotels', label: 'Hotels & Hostels', icon: BedDouble, targetUrl: '/stays', btnLabel: 'SEARCH HOTELS & HOSTELS' },
    { id: 'routes', label: 'Routes & Waypoints', icon: Route, targetUrl: '/route-planner', btnLabel: 'OPTIMIZE CIRCUIT ROUTE' },
    { id: 'ai', label: 'AI Trip Planner', icon: Sparkles, targetUrl: '/ai-planner', btnLabel: 'GENERATE AI ITINERARY' },
    { id: 'heritage', label: 'HeritageGPT', icon: Scroll, targetUrl: '/heritage', btnLabel: 'EXPLORE SACRED LORE' },
    { id: 'budget', label: 'Budget & Tolls', icon: Wallet, targetUrl: '/budget', btnLabel: 'CALCULATE FARES & TOLLS' },
    { id: 'style', label: 'Moments & Feed', icon: Camera, targetUrl: '/my-trip', btnLabel: 'OPEN REEL STORYBOARD' },
  ];

  const currentTabConfig = categoryTabs.find(t => t.id === activeTab) || categoryTabs[0];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setOpenDropdown(null);

    // Auto-update presets for context
    if (tabId === 'hotels') {
      setDestinationInput('Rishikesh Tapovan');
      setOriginInput('Hostel & Haveli Stays');
      setDatesInput('Check-in: 3 Nights');
      setTravellersInput('1 Bed in Dorm • ₹650/nt');
    } else if (tabId === 'routes') {
      setDestinationInput('Kedarnath & Badrinath');
      setOriginInput('Starting from Delhi NCR');
      setDatesInput('Express / Vande Bharat');
      setTravellersInput('Multi-stop (2-Opt TSP)');
    } else if (tabId === 'ai') {
      setDestinationInput('Rajasthan Palaces & Ghats');
      setOriginInput('Starting from Jaipur');
      setDatesInput('5 Days Custom Circuit');
      setTravellersInput('2 Travellers • Budget ₹20k');
    } else if (tabId === 'heritage') {
      setDestinationInput('Kedarnath 12th Jyotirlinga');
      setOriginInput('Garhwali & Kumaoni Lore');
      setDatesInput('Katyuri Stone Architecture');
      setTravellersInput('Uttarakhand Biometric e-Pass');
    } else if (tabId === 'budget') {
      setDestinationInput('Himalayan High Passes');
      setOriginInput('Transit + Stays + Dhabas');
      setDatesInput('4 Days Duration');
      setTravellersInput('Target Limit: ₹18,000');
    } else if (tabId === 'style') {
      setDestinationInput('Amber Fort Dawn & Lakes');
      setOriginInput('Golden Hour 05:45 AM');
      setDatesInput('7-Beat Cinematic Reel');
      setTravellersInput('Bill Split + Mock UPI');
    } else {
      setDestinationInput('Kedarnath, Uttarakhand');
      setOriginInput('Haridwar / Rishikesh');
      setDatesInput('May 15 - May 20, 2026');
      setTravellersInput('2 Travellers • Budget ₹15k');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'hotels') {
      navigate('/stays');
    } else if (activeTab === 'routes') {
      navigate('/route-planner');
    } else if (activeTab === 'ai') {
      navigate(`/ai-planner?prompt=${encodeURIComponent(`Trip from ${originInput} to ${destinationInput} for ${travellersInput}`)}`);
    } else if (activeTab === 'heritage') {
      navigate('/heritage');
    } else if (activeTab === 'budget') {
      navigate('/budget');
    } else if (activeTab === 'style') {
      navigate('/my-trip');
    } else {
      navigate(`/destinations?search=${encodeURIComponent(destinationInput.split(',')[0].trim())}`);
    }
  };

  const handleQuickPrompt = (text) => {
    navigate(`/ai-planner?prompt=${encodeURIComponent(text)}`);
  };

  const filteredDestinations = selectedCategory === 'all'
    ? FALLBACK_DESTINATIONS
    : FALLBACK_DESTINATIONS.filter(d => d.type === selectedCategory);

  return (
    <div className="w-full bg-[#F2F4F7] min-h-screen">
      {/* 0. LIVE WEATHER & TELEMETRY TICKER */}
      <div className="w-full bg-[#0B1528] text-white py-2 px-4 border-b border-gray-800 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar font-medium">
          <div className="flex items-center gap-6 whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-[#53B2FE] font-bold text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" /> LIVE TELEMETRY
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <CloudSun size={13} className="text-amber-400" /> Jaipur: 28°C (Sunny & Pleasant)
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <Snowflake size={13} className="text-cyan-400" /> Kedarnath: 4°C (Clear skies • 3,583m)
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <CloudSun size={13} className="text-amber-400" /> Rishikesh: 23°C (Ganga Aarti: 6:15 PM)
            </span>
            <span className="flex items-center gap-1 text-gray-300">
              <Snowflake size={13} className="text-cyan-400" /> Badrinath: 7°C (Pilgrim Portal Active)
            </span>
          </div>
          <span className="text-gray-400 text-[11px] hidden lg:inline font-mono">
            Devasthanam Board & IMD Live Sensor Feed
          </span>
        </div>
      </div>

      {/* 1. MAKEMYTRIP-STYLE HERO BANNER + FLOATING SEARCH WIDGET */}
      <section className="relative w-full bg-[#0A192F] pb-24 lg:pb-32 pt-8 lg:pt-14 overflow-visible">
        {/* Scenic Background image with high quality Indian landscape */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        {/* Soft dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A192F]/90 via-[#0A192F]/70 to-[#0A192F]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md mb-3">
            <Sparkles size={13} className="text-[#53B2FE]" />
            <span>Bharat's Smartest Multi-Modal Travel & Pilgrimage Platform</span>
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Plan, Route & Experience <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#53B2FE] via-[#60A5FA] to-[#38BDF8]">
              Incredible India
            </span> Seamlessly
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-normal">
            Heritage circuits, sacred Himalayan yatra passes, verified hostels, authentic regional food, and intelligent budget calculations in one place.
          </p>
        </div>

        {/* OVERLAPPING FLOATING SEARCH CARD CONTAINER */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 -bottom-16 lg:-bottom-24 z-20">
          {/* Category Tabs Pill Bar */}
          <div className="bg-white rounded-t-2xl shadow-lg border border-gray-200 border-b-0 px-2 sm:px-6 pt-3 flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
            {categoryTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#008CFF] text-[#008CFF] bg-blue-50/60'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-[#008CFF]' : 'text-gray-400'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Main Search Input Grid */}
          <div className="bg-white rounded-b-2xl shadow-xl border border-gray-200 p-5 sm:p-7 relative">
            <form onSubmit={handleSearchSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 border border-gray-200 rounded-xl divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-white">
                {/* 1. Destination / Target */}
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'dest' ? null : 'dest')}
                  className="p-3 sm:p-4 hover:bg-blue-50/40 transition-colors rounded-t-xl md:rounded-l-xl md:rounded-tr-none cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      {activeTab === 'hotels' ? 'CITY / LOCALITY' : activeTab === 'routes' ? 'DESTINATION STOP' : activeTab === 'heritage' ? 'SACRED SHRINE' : 'DESTINATION / CIRCUIT'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={destinationInput}
                    onChange={(e) => setDestinationInput(e.target.value)}
                    placeholder="Where to? (e.g. Kedarnath)"
                    className="w-full text-base sm:text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mt-0.5"
                  />
                  <span className="text-xs text-[#008CFF] font-semibold block truncate">
                    Click to choose popular spots
                  </span>

                  {/* Dropdown Options */}
                  {openDropdown === 'dest' && (
                    <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl border border-gray-200 shadow-2xl p-3 z-30 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 block mb-1">
                        Select Popular Spot
                      </span>
                      {[
                        'Kedarnath Dham, Uttarakhand',
                        'Badrinath Dham, Uttarakhand',
                        'Jaipur Pink City, Rajasthan',
                        'Udaipur Lake Pichola, Rajasthan',
                        'Rishikesh Tapovan, Uttarakhand',
                        'Jageshwar Dham, Almora'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDestinationInput(item);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#008CFF] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 2. From City / Property Type */}
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'origin' ? null : 'origin')}
                  className="p-3 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      {activeTab === 'hotels' ? 'STAY CATEGORY' : activeTab === 'heritage' ? 'DIALECT / SCRIPT' : 'STARTING FROM'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={originInput}
                    onChange={(e) => setOriginInput(e.target.value)}
                    placeholder="Departure city"
                    className="w-full text-base sm:text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mt-0.5"
                  />
                  <span className="text-xs text-gray-400 block truncate">
                    Delhi, Haridwar, Rishikesh, Jaipur
                  </span>

                  {/* Dropdown Options */}
                  {openDropdown === 'origin' && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-2xl p-3 z-30 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 block mb-1">
                        {activeTab === 'hotels' ? 'Choose Stay Type' : 'Choose Origin'}
                      </span>
                      {(activeTab === 'hotels'
                        ? ['Hostels & Dorms (₹450+)', 'Heritage Havelis (₹2,200+)', 'Riverside Ashrams (₹800+)']
                        : ['Delhi NCR (Bus / Vande Bharat)', 'Haridwar Junction', 'Rishikesh Yoga Town', 'Jaipur Central']
                      ).map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOriginInput(item);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#008CFF] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Travel Dates / Duration */}
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'dates' ? null : 'dates')}
                  className="p-3 sm:p-4 hover:bg-blue-50/40 transition-colors cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      {activeTab === 'routes' ? 'TRANSIT VEHICLE' : 'DATES & DURATION'}
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={datesInput}
                    onChange={(e) => setDatesInput(e.target.value)}
                    placeholder="Select dates"
                    className="w-full text-base sm:text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mt-0.5"
                  />
                  <span className="text-xs text-gray-400 block truncate">
                    Best seasons & temple portal times
                  </span>

                  {/* Dropdown Options */}
                  {openDropdown === 'dates' && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-2xl p-3 z-30 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 block mb-1">
                        Select Season / Timing
                      </span>
                      {[
                        'May 15 - May 20 (Temple Portal Opening)',
                        'Oct 10 - Oct 15 (Autumn Festivities)',
                        'Weekend 3-Day Express Circuit',
                        '7-Day Full Heritage Odyssey'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDatesInput(item);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#008CFF] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. Travellers & Budget */}
                <div
                  onClick={() => setOpenDropdown(openDropdown === 'travellers' ? null : 'travellers')}
                  className="p-3 sm:p-4 hover:bg-blue-50/40 transition-colors rounded-b-xl md:rounded-r-xl md:rounded-bl-none cursor-pointer relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      TRAVELLERS & BUDGET
                    </span>
                    <ChevronDown size={14} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={travellersInput}
                    onChange={(e) => setTravellersInput(e.target.value)}
                    placeholder="Travellers count"
                    className="w-full text-base sm:text-lg font-bold text-gray-900 bg-transparent focus:outline-none placeholder-gray-400 mt-0.5"
                  />
                  <span className="text-xs text-gray-400 block truncate">
                    Solo, Couple, Family, Group
                  </span>

                  {/* Dropdown Options */}
                  {openDropdown === 'travellers' && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-gray-200 shadow-2xl p-3 z-30 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 block mb-1">
                        Select Group & Budget
                      </span>
                      {[
                        'Solo Traveller • Budget ₹8k',
                        '2 Travellers (Couple) • Budget ₹15k',
                        'Family of 4 • Budget ₹30k',
                        'Group of 6+ Backpackers • Budget ₹45k'
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setTravellersInput(item);
                            setOpenDropdown(null);
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:bg-blue-50 hover:text-[#008CFF] transition-colors"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Centered Large Blue CTA Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-5">
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-full bg-gradient-to-r from-[#53B2FE] via-[#008CFF] to-[#065AF3] text-white font-extrabold text-base uppercase tracking-wider shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Search size={18} />
                  <span>{currentTabConfig.btnLabel}</span>
                </button>

                <Link
                  to={currentTabConfig.targetUrl}
                  className="text-xs font-bold text-[#008CFF] hover:underline flex items-center gap-1"
                >
                  Direct Page View <ArrowRight size={13} />
                </Link>
              </div>
            </form>

            {/* Quick Filter Badges under search */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600">
              <span className="font-semibold text-gray-400">Popular Quick Filters:</span>
              <button
                type="button"
                onClick={() => handleQuickPrompt('4 Day Kedarnath & Badrinath budget itinerary from Haridwar')}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#008CFF] rounded-full transition-colors cursor-pointer"
              >
                Kedarnath Circuit
              </button>
              <button
                type="button"
                onClick={() => handleQuickPrompt('3 Day Royal Forts & Palaces Jaipur itinerary under ₹12,000')}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#008CFF] rounded-full transition-colors cursor-pointer"
              >
                Jaipur Heritage
              </button>
              <button
                type="button"
                onClick={() => handleQuickPrompt('Rishikesh Ganga Rafting & Meditation weekend plan under ₹8,000')}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#008CFF] rounded-full transition-colors cursor-pointer"
              >
                Rishikesh Adventure
              </button>
              <button
                type="button"
                onClick={() => handleQuickPrompt('Udaipur Lake Pichola & Heritage Cafes for 3 days')}
                className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-[#008CFF] rounded-full transition-colors cursor-pointer"
              >
                Udaipur Lakes
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SPACING UNDER OVERLAPPING HERO CARD */}
      <div className="h-20 lg:h-28" />

      {/* 2. PROMOTIONAL FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/heritage"
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-[#008CFF] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#008CFF] flex items-center justify-center shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#008CFF]">Official Yatra Pass</h4>
              <p className="text-xs text-gray-500 mt-0.5">Biometric registration guides & SDRF emergency hotline 1070.</p>
            </div>
          </Link>

          <Link
            to="/ai-planner"
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-[#00A86B] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00A86B] flex items-center justify-center shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#00A86B]">AI Neural Planner</h4>
              <p className="text-xs text-gray-500 mt-0.5">Day-by-day smart itineraries with real timings and realistic costs.</p>
            </div>
          </Link>

          <Link
            to="/budget"
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-[#FF6D38] transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6D38] flex items-center justify-center shrink-0">
              <Wallet size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF6D38]">Zero Hidden Markup</h4>
              <p className="text-xs text-gray-500 mt-0.5">Direct hostel prices, transparent bus/train fares, and expense sync.</p>
            </div>
          </Link>

          <Link
            to="/route-planner"
            className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-start gap-3.5 hover:shadow-md hover:border-indigo-600 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Route size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600">2-Opt Route Engine</h4>
              <p className="text-xs text-gray-500 mt-0.5">Shortest distance highway matrix and transit time estimators.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. TRENDING DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008CFF] block">
              POPULAR CIRCUITS & DESTINATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Trending Places to Explore
            </h2>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['all', 'pilgrimage', 'heritage', 'adventure', 'temple'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#008CFF] text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
            <Link
              to="/destinations"
              className="text-xs font-bold text-[#008CFF] hover:underline flex items-center gap-1 ml-2 whitespace-nowrap"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDestinations.slice(0, 4).map((dest) => {
            const isSelected = (selectedDestinations || []).some(d => d.slug === dest.slug);
            return (
              <div
                key={dest.slug}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMG_FALLBACK;
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                    <Star size={11} className="fill-white" />
                    <span>{dest.rating}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {dest.state}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#008CFF] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#008CFF] font-medium mt-0.5">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Avg Daily</span>
                      <span className="text-sm font-mono font-black text-gray-900">
                        ₹{(dest.avgDailyCost || 1500).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          addDestination(dest);
                          toast.success(`${dest.name} added to your active trip!`);
                        }}
                        className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-[#00A86B] border border-[#00A86B]/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#008CFF]'
                        }`}
                        title={isSelected ? 'Added to trip' : 'Add to trip'}
                      >
                        {isSelected ? <Check size={15} /> : '+ Add'}
                      </button>
                      <Link
                        to={`/destinations/${dest.slug}`}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-[#008CFF] text-xs font-bold hover:bg-[#008CFF] hover:text-white transition-colors"
                      >
                        Explore
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INTERACTIVE ROUTE MAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <InteractiveRouteMap />
      </section>

      {/* 5. TOP-RATED STAYS & HOSTELS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#008CFF] block">
              VERIFIED BACKPACKER & PILGRIM STAYS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Top-Rated Hostels & Ashram Stays
            </h2>
          </div>
          <Link
            to="/stays"
            className="text-xs font-bold text-[#008CFF] hover:underline flex items-center gap-1"
          >
            View All Stays <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FALLBACK_STAYS.slice(0, 3).map((stay) => {
            const stayPrice = stay.priceRange?.min || stay.pricePerNight || 850;
            return (
              <div
                key={stay._id || stay.id || stay.slug}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={stay.heroImage}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMG_FALLBACK;
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star size={11} className="fill-white" />
                    <span>{stay.rating}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold px-2 py-0.5 rounded-full">
                    {(stay.type || 'Stay').toUpperCase()}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <MapPin size={12} className="text-[#008CFF]" />
                      <span className="capitalize">{stay.destinationSlug?.replace('-', ' ') || 'India'}</span>
                    </div>
                    <h3 className="font-extrabold text-base text-gray-900 group-hover:text-[#008CFF] transition-colors">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {stay.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {(stay.amenities || []).slice(0, 3).map((a, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Starting From</span>
                      <span className="text-base font-mono font-black text-gray-900">
                        ₹{stayPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-gray-500"> / night</span>
                    </div>

                    <Link
                      to="/stays"
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow hover:shadow-md transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. LOCAL FOOD & CULINARY TRAIL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6D38] block">
                AUTHENTIC CULINARY EXPERIENCES
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
                Iconic Regional Dishes & Spots
              </h2>
            </div>
            <Link
              to="/destinations"
              className="text-xs font-bold text-[#008CFF] hover:underline flex items-center gap-1"
            >
              Explore Food Trails <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FALLBACK_FOODS.slice(0, 4).map((food) => {
              const priceText = typeof food.priceRange === 'object' && food.priceRange
                ? `${food.priceRange.min} - ₹${food.priceRange.max}`
                : (food.priceRange || '150 - 450');

              return (
                <div
                  key={food._id || food.id || food.name}
                  className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 flex items-center gap-3 hover:bg-blue-50/40 transition-colors"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = DEFAULT_IMG_FALLBACK;
                    }}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00A86B]" />
                      <span className="text-[10px] uppercase font-bold text-gray-400">Pure Veg</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 truncate mt-0.5">{food.name}</h4>
                    <span className="text-xs text-gray-500 block truncate">{food.address || food.famousSpot || 'Famous Local Spot'}</span>
                    <span className="text-xs font-mono font-bold text-gray-900 mt-1 block">
                      ₹{priceText}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. AI PLANNER BANNER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#008CFF] to-[#0052CC] p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
              <Sparkles size={13} />
              <span>AI TRIP ARCHITECT</span>
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Tired of Generic Travel Guides? Let AI Build Your Custom Circuit.
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Tell us your starting city, budget limit, and travel vibe. We calculate optimal road routes, AMS altitude acclimatization rests, and temple darshan timings in seconds.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/ai-planner"
                className="px-6 py-3 rounded-full bg-white text-[#0052CC] font-extrabold text-sm shadow hover:bg-gray-100 transition-colors"
              >
                Launch AI Planner Now
              </Link>
              <Link
                to="/heritage"
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm transition-colors"
              >
                Ask HeritageGPT
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
