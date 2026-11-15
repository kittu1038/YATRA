import { useState } from 'react';
import { FALLBACK_STAYS } from '../utils/destinationsData.js';
import { useTrip } from '../context/TripContext.jsx';
import {
  Bed,
  MapPin,
  Star,
  Check,
  Filter,
  DollarSign,
  Coffee,
  Wifi,
  Sparkles,
  SlidersHorizontal,
  X,
  Search,
  ChevronDown,
  ShieldCheck,
  Heart
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';

export default function StaysPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedAmenity, setSelectedAmenity] = useState('all');
  const [selectedStayForModal, setSelectedStayForModal] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const { addStay, removeStay, selectedStays } = useTrip();

  const filteredStays = FALLBACK_STAYS.filter((stay) => {
    const matchesType = selectedType === 'all' || stay.type === selectedType;
    const price = stay.priceRange?.min || stay.pricePerNight || 0;
    const matchesPrice = price <= maxPrice;
    const matchesRating = stay.rating >= minRating;
    const matchesLocation = !searchLocation.trim() || 
      stay.destinationSlug.toLowerCase().includes(searchLocation.toLowerCase()) ||
      stay.name.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesAmenity = selectedAmenity === 'all' || (stay.amenities || []).includes(selectedAmenity);

    return matchesType && matchesPrice && matchesRating && matchesLocation && matchesAmenity;
  });

  const amenitiesList = ['Free High-Speed WiFi', 'Rooftop Cafe', 'Hot Water 24/7', 'Luggage Storage', 'AC & Heating'];

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
              <span>Home</span>
              <span>/</span>
              <span>Hotels & Hostels</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Verified Hostels, Ashrams & Heritage Stays
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredStays.length} hand-picked stays across Uttarakhand & Rajasthan with transparent INR pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-bold shadow-sm"
            >
              <SlidersHorizontal size={16} />
              <span>Filters ({[selectedType !== 'all', maxPrice < 15000, minRating > 0].filter(Boolean).length})</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#008CFF]">
              <ShieldCheck size={16} />
              <span>100% Verified Properties</span>
            </div>
          </div>
        </div>

        {/* 2-Column Classic OTA Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* LEFT FILTER SIDEBAR (Desktop Sticky) */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-20 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                  <Filter size={15} className="text-[#008CFF]" /> Filters
                </span>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setMaxPrice(15000);
                    setMinRating(0);
                    setSearchLocation('');
                    setSelectedAmenity('all');
                  }}
                  className="text-xs text-[#008CFF] font-semibold hover:underline"
                >
                  Reset All
                </button>
              </div>

              {/* Search by location */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1.5">
                  Search City / Name
                </label>
                <div className="relative">
                  <Search size={15} className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    placeholder="e.g. Rishikesh, Jaipur..."
                    className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:border-[#008CFF] text-gray-900"
                  />
                </div>
              </div>

              {/* Property Type Toggle */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Property Category
                </label>
                <div className="space-y-1.5">
                  {[
                    { id: 'all', label: 'All Types' },
                    { id: 'hostel', label: 'Hostel & Dorms' },
                    { id: 'hotel', label: 'Heritage & Boutique' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedType(t.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedType === t.id
                          ? 'bg-blue-50 text-[#008CFF] font-bold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{t.label}</span>
                      {selectedType === t.id && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Max Price / Night
                  </label>
                  <span className="font-mono text-xs font-bold text-[#008CFF]">
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#008CFF] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>₹500</span>
                  <span>₹7,500</span>
                  <span>₹15,000</span>
                </div>
              </div>

              {/* Rating filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  User Rating
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 4.0, 4.5, 4.8].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className={`py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                        minRating === r
                          ? 'bg-[#008CFF] border-[#008CFF] text-white'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {r === 0 ? 'Any' : `${r}+ ★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenity filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  Amenities
                </label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedAmenity('all')}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                      selectedAmenity === 'all' ? 'text-[#008CFF] font-bold bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>Any Amenity</span>
                  </button>
                  {amenitiesList.map((a) => (
                    <button
                      key={a}
                      onClick={() => setSelectedAmenity(a)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between ${
                        selectedAmenity === a ? 'text-[#008CFF] font-bold bg-blue-50' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>{a}</span>
                      {selectedAmenity === a && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT RESULTS LIST (Desktop 8/9 cols) */}
          <main className="md:col-span-8 lg:col-span-9 space-y-4">
            {filteredStays.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-sm">
                <Bed size={36} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-bold text-gray-900">No Stays Found</h3>
                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                  Try adjusting your filters or search terms to see available stays in this area.
                </p>
                <button
                  onClick={() => {
                    setSelectedType('all');
                    setMaxPrice(15000);
                    setMinRating(0);
                    setSearchLocation('');
                    setSelectedAmenity('all');
                  }}
                  className="mt-4 px-4 py-2 bg-[#008CFF] text-white text-xs font-bold rounded-lg shadow"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              filteredStays.map((stay) => {
                const isSelected = selectedStays.some(s => s.id === stay.id);

                return (
                  <div
                    key={stay.id}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col sm:flex-row group"
                  >
                    {/* Stay Image with badges */}
                    <div className="sm:w-64 lg:w-72 relative shrink-0 aspect-[16/10] sm:aspect-auto">
                      <img
                        src={stay.heroImage}
                        alt={stay.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Star size={11} className="fill-white" />
                        <span>{stay.rating}</span>
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-sm">
                        {stay.type}
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <MapPin size={13} className="text-[#008CFF]" />
                          <span className="font-semibold capitalize">{stay.destinationSlug.replace('-', ' ')}</span>
                          <span className="text-gray-300">•</span>
                          <span>Centrally located</span>
                        </div>

                        <h3 className="text-lg font-black text-gray-900 group-hover:text-[#008CFF] transition-colors">
                          {stay.name}
                        </h3>

                        <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                          {stay.description}
                        </p>

                        {/* Amenities Chips */}
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {stay.amenities.map((amenity, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Pricing & Booking CTA */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-gray-400 block">
                            Taxes & Fees Included
                          </span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-mono font-black text-gray-900">
                              ₹{(stay.priceRange?.min || stay.pricePerNight || 850).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs text-gray-500">/ night</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedStayForModal(stay)}
                            className="px-3.5 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => {
                              if (isSelected) {
                                removeStay(stay.id);
                              } else {
                                addStay(stay);
                              }
                            }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-emerald-600 text-white'
                                : 'bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white hover:shadow-md'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check size={14} />
                                <span>Booked in Trip</span>
                              </>
                            ) : (
                              <span>Add to Trip</span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </main>
        </div>
      </div>

      {/* MOBILE SLIDE-UP FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto space-y-6 animate-slide-up">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="font-extrabold text-base text-gray-900">Filter Stays</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Type */}
            <div>
              <label className="text-xs font-bold uppercase text-gray-500 block mb-2">Category</label>
              <div className="flex gap-2">
                {['all', 'hostel', 'hotel'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border capitalize ${
                      selectedType === t ? 'bg-[#008CFF] text-white border-[#008CFF]' : 'border-gray-200 text-gray-700'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Price */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-gray-500">Max Price:</span>
                <span className="text-[#008CFF]">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="250"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#008CFF]"
              />
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white font-bold text-sm shadow-md"
            >
              Apply Filters ({filteredStays.length} Stays)
            </button>
          </div>
        </div>
      )}

      {/* DETAIL MODAL */}
      {selectedStayForModal && (
        <Modal
          isOpen={!!selectedStayForModal}
          onClose={() => setSelectedStayForModal(null)}
          title={selectedStayForModal.name}
        >
          <div className="space-y-4">
            <div className="aspect-[16/9] rounded-xl overflow-hidden">
              <img
                src={selectedStayForModal.heroImage}
                alt={selectedStayForModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#008CFF] capitalize">
                {selectedStayForModal.destinationSlug.replace('-', ' ')}
              </span>
              <div className="flex items-center gap-1 bg-[#00A86B] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                <Star size={11} className="fill-white" />
                <span>{selectedStayForModal.rating}</span>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {selectedStayForModal.description}
            </p>

            <div>
              <h4 className="text-xs font-bold uppercase text-gray-500 mb-2">Amenities Included</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedStayForModal.amenities.map((a, i) => (
                  <div key={i} className="text-xs bg-gray-50 p-2 rounded-lg text-gray-700 flex items-center gap-1.5">
                    <Check size={13} className="text-[#00A86B]" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Rate Per Night</span>
                <span className="text-xl font-mono font-black text-gray-900">
                  ₹{(selectedStayForModal.priceRange?.min || selectedStayForModal.pricePerNight || 850).toLocaleString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => {
                  addStay(selectedStayForModal);
                  setSelectedStayForModal(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow-md hover:shadow-lg"
              >
                Book This Stay
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
