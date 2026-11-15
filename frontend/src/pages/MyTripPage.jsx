import { useState } from 'react';
import { useTrip } from '../context/TripContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Wallet,
  Calendar,
  CheckSquare,
  Sparkles,
  Camera,
  Shirt,
  Film,
  Plus,
  Trash2,
  DollarSign,
  CloudRain,
  Sun,
  ShieldAlert,
  ArrowUpRight,
  TrendingDown,
  Layers,
  MoveUp,
  MoveDown,
  Printer,
  Share2,
  QrCode,
  Users,
  Check
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import Tabs from '../components/ui/Tabs.jsx';
import Modal from '../components/ui/Modal.jsx';
import toast from 'react-hot-toast';

export default function MyTripPage() {
  const { user } = useAuth();
  const {
    tripTitle,
    selectedDestinations,
    selectedStays,
    budget,
    route,
    itinerary,
    expenses,
    packingList,
    totalSpent,
    remainingBudget,
    addExpense,
    deleteExpense,
    togglePackingItem,
    addPackingItem,
    reorderActivities
  } = useTrip();

  const [activeTab, setActiveTab] = useState('itinerary');
  const [splitModalOpen, setSplitModalOpen] = useState(false);
  const [splitPeople, setSplitPeople] = useState(budget?.groupSize || 2);

  // Expense form state
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('food');
  const [expensePayment, setExpensePayment] = useState('upi');

  // Custom packing item state
  const [newPackingItem, setNewPackingItem] = useState('');

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount || Number(expenseAmount) <= 0) {
      toast.error('Please enter valid expense title and INR amount');
      return;
    }

    addExpense({
      title: expenseTitle,
      amount: Number(expenseAmount),
      category: expenseCategory,
      paymentMethod: expensePayment,
    });

    setExpenseTitle('');
    setExpenseAmount('');
    toast.success('Expense recorded and deducted from remaining pool!');
  };

  const handleAddCustomPacking = (e) => {
    e.preventDefault();
    if (!newPackingItem.trim()) return;
    addPackingItem(newPackingItem, 'Custom Gear');
    setNewPackingItem('');
    toast.success('Added to packing checklist');
  };

  const moveActivity = (dayIndex, actIndex, direction) => {
    if (!itinerary?.days) return;
    const targetDay = itinerary.days[dayIndex];
    if (!targetDay) return;

    const newIndex = actIndex + direction;
    if (newIndex < 0 || newIndex >= targetDay.activities.length) return;

    const newActivities = [...targetDay.activities];
    const [moved] = newActivities.splice(actIndex, 1);
    newActivities.splice(newIndex, 0, moved);

    reorderActivities(dayIndex, newActivities);
    toast.success('Schedule reordered');
  };

  const handlePrintDossier = () => {
    window.print();
  };

  const tabs = [
    { id: 'itinerary', label: 'Day-by-Day Schedule', icon: Calendar },
    { id: 'expenses', label: 'Expense Logger', icon: Wallet, count: (expenses || []).length },
    { id: 'packing', label: 'Packing Checklist', icon: CheckSquare, count: (packingList || []).filter(p => !p.isPacked).length },
    { id: 'style', label: 'Style & Moments (Reel Toolkit)', icon: Film },
  ];

  const formatINR = (val) => `₹${(val || 0).toLocaleString('en-IN')}`;
  const splitPerPerson = Math.round((totalSpent > 0 ? totalSpent : (budget?.total || 10000)) / (splitPeople || 1));

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
              <span>Home</span>
              <span>/</span>
              <span>My Active Trip</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-gray-900">
              {tripTitle}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
              {(selectedDestinations || []).length} Stops queued • {budget?.days || 4} Days • {budget?.groupSize || 2} Traveller(s)
            </p>
          </div>

          {/* Live Burn Counter & Print */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">ACTUAL SPENT</span>
                <span className="text-lg font-mono font-black text-[#008CFF]">{formatINR(totalSpent)}</span>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">REMAINING POOL</span>
                <span className="text-lg font-mono font-black text-gray-900">{formatINR(remainingBudget)}</span>
              </div>
            </div>

            <button
              onClick={() => setSplitModalOpen(true)}
              className="p-3 bg-white border border-gray-200 rounded-xl text-[#008CFF] hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
              title="Split Expenses With Friends"
            >
              <Users size={18} />
            </button>
            <button
              onClick={handlePrintDossier}
              className="p-3 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
              title="Print Itinerary / Export PDF"
            >
              <Printer size={18} />
            </button>
          </div>
        </div>

        {/* Tabs Switcher */}
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

        {/* Tab: Itinerary */}
        {activeTab === 'itinerary' && (
          <div className="space-y-6">
            {!itinerary || !itinerary.days || itinerary.days.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <Calendar size={36} className="text-[#008CFF] mx-auto" />
                <h3 className="font-bold text-lg text-gray-900">
                  No generated day-by-day schedule loaded yet
                </h3>
                <p className="text-xs text-gray-500 max-w-md mx-auto">
                  Generate an itinerary using our grounded AI Trip Planner or assemble one manually.
                </p>
                <Button variant="primary" onClick={() => window.location.href = '/ai-planner'}>
                  <Sparkles size={16} />
                  <span>Launch AI Trip Planner</span>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {itinerary.days.map((day, dIdx) => (
                  <div key={dIdx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#008CFF] font-mono font-bold text-xs flex items-center justify-center">
                          D{day.day || dIdx + 1}
                        </span>
                        <div>
                          <h3 className="font-black text-base text-gray-900">{day.title}</h3>
                          <span className="text-xs font-semibold text-[#008CFF]">{day.location || 'Trip Leg'}</span>
                        </div>
                      </div>

                      {day.weatherNote && (
                        <span className="text-xs text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                          {day.weatherNote}
                        </span>
                      )}
                    </div>

                    {/* Reorderable Activities */}
                    <div className="space-y-2.5">
                      {day.activities?.map((act, aIdx) => (
                        <div
                          key={aIdx}
                          className="p-3.5 bg-gray-50/60 rounded-xl border border-gray-100 hover:border-blue-200 transition-all flex items-center justify-between gap-4 group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="font-mono text-xs font-bold text-[#008CFF] pt-0.5 w-12 shrink-0">{act.time}</span>
                            <div>
                              <span className="font-bold text-sm text-gray-900 block">
                                {act.title}
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5">{act.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            {act.cost > 0 && (
                              <span className="text-xs font-mono font-bold text-gray-800">₹{act.cost}</span>
                            )}

                            {/* Reorder buttons */}
                            <div className="flex flex-col opacity-60 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => moveActivity(dIdx, aIdx, -1)}
                                disabled={aIdx === 0}
                                className="text-gray-400 hover:text-[#008CFF] disabled:opacity-20 p-0.5 cursor-pointer"
                                title="Move Earlier"
                              >
                                <MoveUp size={12} />
                              </button>
                              <button
                                onClick={() => moveActivity(dIdx, aIdx, 1)}
                                disabled={aIdx === day.activities.length - 1}
                                className="text-gray-400 hover:text-[#008CFF] disabled:opacity-20 p-0.5 cursor-pointer"
                                title="Move Later"
                              >
                                <MoveDown size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab: Expense Logger */}
        {activeTab === 'expenses' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Quick Logger */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="pb-3 border-b border-gray-100">
                <h3 className="font-black text-base text-gray-900">Log Instant Expense</h3>
                <p className="text-xs text-gray-500">Record auto fare, meals, tickets, or offerings</p>
              </div>

              <form onSubmit={handleCreateExpense} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Item Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Haridwar to Rishikesh tempo taxi"
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#008CFF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Amount (INR ₹)</label>
                    <input
                      type="number"
                      placeholder="e.g. 450"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-gray-900 outline-none focus:border-[#008CFF]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Category</label>
                    <select
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#008CFF]"
                    >
                      <option value="food">Food & Meals</option>
                      <option value="transit">Transit & Taxis</option>
                      <option value="stay">Stays & Hostels</option>
                      <option value="activities">Entry & Guides</option>
                      <option value="shopping">Souvenirs</option>
                      <option value="misc">Miscellaneous</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Payment Instrument</label>
                  <select
                    value={expensePayment}
                    onChange={(e) => setExpensePayment(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-900 outline-none focus:border-[#008CFF]"
                  >
                    <option value="upi">UPI (GPay / PhonePe / Paytm)</option>
                    <option value="cash">Hard Cash INR</option>
                    <option value="card">Debit / Credit Card</option>
                    <option value="netbanking">Net Banking</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus size={15} />
                  <span>Record Expense</span>
                </button>
              </form>
            </div>

            {/* Right: Expense Ledger */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <h3 className="font-black text-base text-gray-900">
                  Logged Transactions ({(expenses || []).length})
                </h3>
                <span className="text-xs font-mono text-[#008CFF] font-bold">
                  Spent: {formatINR(totalSpent)} / {formatINR(budget?.total)}
                </span>
              </div>

              {(expenses || []).length === 0 ? (
                <div className="p-8 text-center text-xs text-gray-500">
                  No expenses recorded yet. Use the logger on the left to track real costs.
                </div>
              ) : (
                <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
                  {expenses.map((exp) => (
                    <div
                      key={exp._id || exp.id}
                      className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-gray-900">
                            {exp.title}
                          </span>
                          <span className="text-[10px] bg-blue-50 text-[#008CFF] px-2 py-0.5 rounded font-bold uppercase">
                            {exp.category}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500">
                          Paid via {exp.paymentMethod?.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono font-bold text-gray-900">
                          ₹{exp.amount}
                        </span>
                        <button
                          onClick={() => deleteExpense(exp._id || exp.id)}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab: Packing Checklist */}
        {activeTab === 'packing' && (
          <div className="max-w-3xl bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
              <div>
                <h3 className="font-black text-lg text-gray-900">
                  Himalayan & Desert Packing Checklist
                </h3>
                <p className="text-xs text-gray-500">Curated essentials based on your selected stops</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#00A86B]">
                {(packingList || []).filter(p => p.isPacked).length} / {(packingList || []).length} packed
              </span>
            </div>

            {/* Add custom item */}
            <form onSubmit={handleAddCustomPacking} className="flex gap-2">
              <input
                type="text"
                placeholder="+ Add personal gear or medicine..."
                value={newPackingItem}
                onChange={(e) => setNewPackingItem(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-xs text-gray-900 outline-none focus:border-[#008CFF]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#008CFF] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Add
              </button>
            </form>

            {/* Checklist Items */}
            <div className="space-y-2">
              {(packingList || []).map((item) => (
                <div
                  key={item.id}
                  onClick={() => togglePackingItem(item.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    item.isPacked
                      ? 'bg-gray-50 border-gray-200 opacity-60'
                      : 'bg-white border-gray-200 hover:border-[#008CFF]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] ${
                      item.isPacked ? 'border-[#00A86B] bg-[#00A86B] text-white' : 'border-gray-300'
                    }`}>
                      {item.isPacked && '✓'}
                    </div>
                    <span className={`text-xs sm:text-sm ${item.isPacked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {item.item}
                    </span>
                  </div>
                  <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
                    {item.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Style & Moments (Creator Toolkit) */}
        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF6D38]">
                CREATOR TOOLKIT
              </span>
              <h3 className="font-black text-xl text-gray-900">
                Style & Moments: The 7-Beat Travel Reel Storyboard
              </h3>
              <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
                Golden hour photography lighting angles, practical wardrobe directives, and a cinematic 7-beat rhythm for authentic travel stories.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lighting */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Camera size={18} className="text-[#008CFF]" />
                  <h4 className="font-black text-base text-gray-900">
                    Lighting & Angle Director
                  </h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                    <span className="font-bold text-[#008CFF] block">05:45 – 07:15 AM (First Sandstone Glow)</span>
                    <p className="text-gray-600 leading-relaxed">
                      Shoot Amber Fort and Hawa Mahal when the low-angle sun hits the red sandstone with zero crowd.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                    <span className="font-bold text-[#008CFF] block">17:00 – 18:30 PM (Blue Hour Waters)</span>
                    <p className="text-gray-600 leading-relaxed">
                      Set a slow shutter at Triveni Ghat (Rishikesh) or Lake Pichola (Udaipur). Capture floating diyas and reflection trails.
                    </p>
                  </div>
                </div>
              </div>

              {/* Wardrobe */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                  <Shirt size={18} className="text-[#00A86B]" />
                  <h4 className="font-black text-base text-gray-900">
                    Practical Wardrobe Directives
                  </h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                    <span className="font-bold text-[#00A86B] block">Desert Forts (Jaipur / Udaipur)</span>
                    <p className="text-gray-600 leading-relaxed">
                      Breathable linen kurtas or light cottons with earth tones (olive, sand, off-white). Cushioned flat soles for cobblestone climbs.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl space-y-1">
                    <span className="font-bold text-[#00A86B] block">Himalayan Pilgrimage (Kedarnath)</span>
                    <p className="text-gray-600 leading-relaxed">
                      Moisture-wicking base layer + fleece mid-layer + windproof shell. Sturdy ankle-support trekking boots.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7-Beat Reel Storyboard */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
                <Film size={18} className="text-[#FF6D38]" />
                <h4 className="font-black text-base text-gray-900">
                  The 7-Beat Cinematic Travel Reel Storyboard
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
                {[
                  { beat: '01', title: 'The Hook', timing: '0-2s', desc: 'Rushing turquoise Ganga rapids or dawn aarti bell stroke.' },
                  { beat: '02', title: 'The Transit', timing: '2-5s', desc: 'Sleeper train window chai cup vibrating with rail rhythm.' },
                  { beat: '03', title: 'Scale', timing: '5-9s', desc: 'Wide slow pan across massive stone shikhara or fort ramparts.' },
                  { beat: '04', title: 'Artisan', timing: '9-12s', desc: 'Hand dipping teak block in indigo dye or rolling fresh Bal Mithai.' },
                  { beat: '05', title: 'Culinary', timing: '12-15s', desc: 'Pouring hot desi ghee over crushed Churma baatis.' },
                  { beat: '06', title: 'Quietude', timing: '15-18s', desc: 'Devotee palms folded in prayer; incense smoke curling up.' },
                  { beat: '07', title: 'The Call', timing: '18-20s', desc: 'Sunset silhouettes over Aravalli hills; YATRA coordinates card.' },
                ].map((b) => (
                  <div key={b.beat} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono font-bold text-[#008CFF] text-xs">BEAT {b.beat}</span>
                        <span className="text-[10px] text-gray-400">{b.timing}</span>
                      </div>
                      <h5 className="font-bold text-xs text-gray-900 mb-1">{b.title}</h5>
                      <p className="text-[11px] text-gray-500 leading-snug">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bill Splitter Modal */}
        {splitModalOpen && (
          <Modal
            isOpen={splitModalOpen}
            onClose={() => setSplitModalOpen(false)}
            title="Split Expenses With Travelling Friends"
            subtitle="Instant equal division with mock UPI settlement QR"
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-600">Total People Sharing:</span>
                  <span className="text-[#008CFF]">{splitPeople} Travellers</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  value={splitPeople}
                  onChange={(e) => setSplitPeople(Number(e.target.value))}
                  className="w-full accent-[#008CFF]"
                />
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-500">TOTAL BILL AMOUNT:</span>
                  <span className="text-gray-900 font-bold">{formatINR(totalSpent > 0 ? totalSpent : (budget?.total || 10000))}</span>
                </div>
                <div className="flex justify-between text-sm font-mono border-t border-gray-200 pt-2">
                  <span className="text-gray-700 font-bold">EACH PERSON OWES:</span>
                  <span className="text-[#00A86B] font-black">{formatINR(splitPerPerson)}</span>
                </div>
              </div>

              {/* Mock QR Settlement */}
              <div className="p-4 bg-white border border-gray-200 rounded-xl text-center space-y-3">
                <div className="w-32 h-32 mx-auto bg-white p-2 border border-gray-200 rounded-lg flex items-center justify-center">
                  <QrCode size={110} className="text-gray-900" />
                </div>
                <p className="text-xs font-bold text-gray-800">
                  UPI QR Code: Scan with GPay / PhonePe / Paytm
                </p>
                <p className="text-[11px] text-gray-500 font-mono">
                  yatra.group.{splitPeople}way@upi • Request {formatINR(splitPerPerson)}
                </p>
              </div>

              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  toast.success(`Share link & UPI request of ₹${splitPerPerson} copied!`);
                  setSplitModalOpen(false);
                }}
              >
                Copy Split Payment Link
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
