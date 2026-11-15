import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FALLBACK_DESTINATIONS } from '../utils/destinationsData.js';
import { useTrip } from '../context/TripContext.jsx';
import {
  Search,
  Filter,
  MapPin,
  Star,
  ChevronRight,
  SlidersHorizontal,
  X,
  Compass,
  ArrowUpDown,
  Check,
  Plus
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { addDestination, selectedDestinations } = useTrip();

  // Filter & Sort
  const filtered = FALLBACK_DESTINATIONS.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dest.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesState = selectedState === 'all' || dest.state === selectedState;
    const matchesType = selectedType === 'all' || dest.type === selectedType;

    return matchesSearch && matchesState && matchesType;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'cost-asc') return a.avgDailyCost - b.avgDailyCost;
    if (sortBy === 'cost-desc') return b.avgDailyCost - a.avgDailyCost;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
            <span>Home</span>
            <span>/</span>
            <span>Destinations</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
            Explore Destinations of India
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1.5 leading-relaxed">
            Ancient Rajput fortifications, glacial Jyotirlinga shrines, and Himalayan yoga sanctuaries. Add stops directly to your active trip.
          </p>
        </div>

        {/* Search, Filter & Sort Bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations, tags or activities..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#008CFF] text-gray-900"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="all">All States</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="Rajasthan">Rajasthan</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="pilgrimage">Pilgrimage</option>
              <option value="heritage">Heritage</option>
              <option value="adventure">Adventure</option>
              <option value="temple">Temple</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="rating">Top Rated</option>
              <option value="cost-asc">Cost: Low to High</option>
              <option value="cost-desc">Cost: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((dest) => {
            const isSelected = (selectedDestinations || []).some(d => d.slug === dest.slug);

            return (
              <div
                key={dest.slug}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={dest.heroImage}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                    <Star size={11} className="fill-white" />
                    <span>{dest.rating}</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                    {dest.state}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-black text-lg text-gray-900 group-hover:text-[#008CFF] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#008CFF] font-semibold mt-0.5">
                      {dest.tagline}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {dest.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-bold block">Avg Daily Cost</span>
                      <span className="text-sm font-mono font-black text-gray-900">
                        ₹{(dest.avgDailyCost || 1500).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addDestination(dest)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-[#00A86B] border border-[#00A86B]/30'
                            : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-[#008CFF]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check size={13} />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus size={13} />
                            <span>Add</span>
                          </>
                        )}
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
      </div>
    </div>
  );
}
