import { useState } from 'react';
import { FALLBACK_DESTINATIONS, FALLBACK_STAYS } from '../utils/destinationsData.js';
import {
  Shield,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  AlertTriangle,
  MessageSquare,
  Building,
  MapPin,
  TrendingUp,
  Star
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Tabs from '../components/ui/Tabs.jsx';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('moderation');

  // Mock pending reviews for moderation
  const [reviews, setReviews] = useState([
    {
      id: 'rev-1',
      author: 'Rohit K.',
      target: 'Zostel Jaipur',
      rating: 5,
      content: 'Unreal haveli vibe. The rooftop view during sunset was breathtaking. Clean dorms and super friendly staff.',
      status: 'pending',
      date: '2 hours ago',
    },
    {
      id: 'rev-2',
      author: 'Ananya S.',
      target: 'Kedarnath Temple Trek',
      rating: 4,
      content: 'Trek was steep and challenging. Ponies make the pathway muddy so wear high-ankle waterproof boots.',
      status: 'pending',
      date: '5 hours ago',
    },
    {
      id: 'rev-3',
      author: 'David M.',
      target: 'LMB Johari Bazaar',
      rating: 5,
      content: 'The authentic dal baati churma is unforgettable. Don’t miss the mawa kachori for breakfast.',
      status: 'pending',
      date: '1 day ago',
    },
  ]);

  const handleModerate = (id, newStatus) => {
    setReviews(prev =>
      prev.map(r => r.id === id ? { ...r, status: newStatus } : r)
    );
    toast.success(`Review ${newStatus === 'approved' ? 'Approved & Published' : 'Rejected'}`);
  };

  const tabs = [
    { id: 'moderation', label: 'Review Moderation', icon: MessageSquare, count: reviews.filter(r => r.status === 'pending').length },
    { id: 'destinations', label: 'Destinations Registry', icon: MapPin, count: FALLBACK_DESTINATIONS.length },
    { id: 'stays', label: 'Hostel & Stay Inventory', icon: Building, count: FALLBACK_STAYS.length },
  ];

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
              <span>Home</span>
              <span>/</span>
              <span>Platform Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Admin & Content Governance Desk
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1 leading-relaxed">
              Audit submitted traveller reviews, manage verified stays inventory, and oversee verified destination records.
            </p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
            <Shield size={20} className="text-amber-600" />
            <div className="text-xs">
              <span className="text-amber-900 font-bold block">Master Admin Privileges</span>
              <span className="text-amber-700">Full Moderation Access</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
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
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon size={15} className={isActive ? 'text-[#008CFF]' : 'text-gray-400'} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-[#008CFF] text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab: Moderation */}
        {activeTab === 'moderation' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-gray-900">
                Traveller Submissions Awaiting Audit
              </h3>
              <span className="text-xs font-mono font-bold text-[#008CFF]">
                {reviews.filter(r => r.status === 'pending').length} pending review(s)
              </span>
            </div>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{rev.author}</span>
                      <span className="text-xs text-gray-400">reviewed</span>
                      <span className="text-xs font-semibold text-[#008CFF]">{rev.target}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                        rev.status === 'approved' ? 'bg-emerald-50 text-[#00A86B]' : rev.status === 'rejected' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {rev.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      "{rev.content}"
                    </p>
                    <span className="text-[10px] text-gray-400 block">Submitted {rev.date} • Rating: ★ {rev.rating}/5</span>
                  </div>

                  {rev.status === 'pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleModerate(rev.id, 'approved')}
                        className="px-3.5 py-1.5 bg-[#00A86B] text-white rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-emerald-700 transition-colors shadow-xs"
                      >
                        <CheckCircle2 size={13} />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleModerate(rev.id, 'rejected')}
                        className="px-3.5 py-1.5 border border-red-200 bg-red-50 text-red-600 rounded-lg font-bold text-xs flex items-center gap-1.5 hover:bg-red-100 transition-colors"
                      >
                        <XCircle size={13} />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Destinations Registry */}
        {activeTab === 'destinations' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900">
                Registered Destination Entities ({FALLBACK_DESTINATIONS.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {FALLBACK_DESTINATIONS.map((d) => (
                <div key={d.slug} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{d.name}</span>
                    <span className="text-gray-400 ml-2 font-mono">({d.state} • {d.type})</span>
                  </div>
                  <span className="font-mono font-bold text-[#008CFF]">₹{d.avgDailyCost} / day</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Stays Inventory */}
        {activeTab === 'stays' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-black text-base text-gray-900">
                Registered Stays & Dorms ({FALLBACK_STAYS.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {FALLBACK_STAYS.map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-gray-900 text-sm">{s.name}</span>
                    <span className="text-gray-400 ml-2 capitalize font-mono">({s.destinationSlug.replace('-', ' ')} • {s.type})</span>
                  </div>
                  <span className="font-mono font-bold text-gray-900">₹{s.pricePerNight} / night</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
