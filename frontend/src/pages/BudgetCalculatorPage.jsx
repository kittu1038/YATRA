import { useState } from 'react';
import { useTrip } from '../context/TripContext.jsx';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';
import {
  Wallet,
  ShieldCheck,
  Users,
  Calendar,
  Train,
  Building,
  Utensils,
  Camera,
  Percent,
  AlertCircle,
  RefreshCw,
  CheckCircle2,
  TrendingUp,
  Check
} from 'lucide-react';
import Badge from '../components/ui/Badge.jsx';
import Button from '../components/ui/Button.jsx';
import toast from 'react-hot-toast';

const COLORS = ['#008CFF', '#00A86B', '#FF6D38', '#8B5CF6', '#F59E0B'];

export default function BudgetCalculatorPage() {
  const {
    budget,
    setBudget,
    selectedDestinations,
    selectedStays,
    route,
    totalSpent,
    remainingBudget
  } = useTrip();

  // Local state for interactive overrides
  const [targetCap, setTargetCap] = useState(budget?.target || 30000);
  const [groupSize, setGroupSize] = useState(budget?.groupSize || 2);
  const [days, setDays] = useState(budget?.days || 4);
  const [transitOverride, setTransitOverride] = useState(budget?.transit || 5000);
  const [stayPerNight, setStayPerNight] = useState(
    selectedStays?.length > 0 ? (selectedStays[0]?.pricePerNight || 2000) : 2000
  );
  const [foodPerDayPerPerson, setFoodPerDayPerPerson] = useState(750);
  const [activitiesPerDay, setActivitiesPerDay] = useState(500);

  // Pure Deterministic Math Engine
  const calculatedStay = Math.round(stayPerNight * days * Math.ceil(groupSize / 2));
  const calculatedFood = Math.round(foodPerDayPerPerson * days * groupSize);
  const calculatedActivities = Math.round(activitiesPerDay * days * groupSize);
  const subtotal = transitOverride + calculatedStay + calculatedFood + calculatedActivities;
  const miscBuffer = Math.round(subtotal * 0.10); // Mandatory 10% safety buffer
  const grandTotal = subtotal + miscBuffer;

  const perPersonCost = Math.round(grandTotal / groupSize);
  const dailyAverage = Math.round(grandTotal / days);
  const variance = targetCap - grandTotal;
  const isOverBudget = variance < 0;

  // Chart Data
  const breakdownData = [
    { name: 'Transport / Transit', value: transitOverride, color: '#008CFF' },
    { name: 'Stays / Hostels', value: calculatedStay, color: '#00A86B' },
    { name: 'Food & Meals', value: calculatedFood, color: '#FF6D38' },
    { name: 'Activities & Permits', value: calculatedActivities, color: '#8B5CF6' },
    { name: 'Contingency (10%)', value: miscBuffer, color: '#F59E0B' },
  ];

  const handleApplyToTrip = () => {
    setBudget({
      target: targetCap,
      total: grandTotal,
      groupSize,
      days,
      transit: transitOverride,
      stay: calculatedStay,
      food: calculatedFood,
      activities: calculatedActivities,
      contingency: miscBuffer,
    });
    toast.success('Budget Synced to Active Trip!');
  };

  const formatINR = (val) => `₹${(val || 0).toLocaleString('en-IN')}`;

  return (
    <div className="min-h-screen bg-[#F2F4F7] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Breadcrumb & Title */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#008CFF] uppercase tracking-wider mb-1">
              <span>Home</span>
              <span>/</span>
              <span>Budget & Fare Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              Deterministic Smart Travel Budget
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mt-1 leading-relaxed">
              Real arithmetic calculations for Trains/Buses + Stays + Local Food + Darshan passes with transparent 10% safety buffer.
            </p>
          </div>

          <button
            onClick={handleApplyToTrip}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Check size={16} />
            <span>Sync to My Trip</span>
          </button>
        </div>

        {/* KPI Cards Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Total Estimated Cost</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#008CFF]">
              {formatINR(grandTotal)}
            </div>
            <span className="text-[10px] text-gray-500 block">Incl. 10% safety contingency</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Cost Per Person</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-gray-900">
              {formatINR(perPersonCost)}
            </div>
            <span className="text-[10px] text-gray-500 block">For {groupSize} traveller(s)</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Daily Burn Rate</span>
            <div className="text-2xl sm:text-3xl font-mono font-black text-gray-900">
              {formatINR(dailyAverage)}
            </div>
            <span className="text-[10px] text-gray-500 block">Across {days} planned days</span>
          </div>

          <div className={`p-5 rounded-2xl border shadow-sm space-y-1 bg-white ${isOverBudget ? 'border-red-300' : 'border-emerald-300'}`}>
            <span className="text-[11px] font-bold uppercase text-gray-400 block">Budget Cap Variance</span>
            <div className={`text-2xl sm:text-3xl font-mono font-black ${isOverBudget ? 'text-red-500' : 'text-[#00A86B]'}`}>
              {isOverBudget ? '-' : '+'}{formatINR(Math.abs(variance))}
            </div>
            <span className="text-[10px] text-gray-500 block">
              {isOverBudget ? 'Exceeds budget cap' : 'Safe within budget'}
            </span>
          </div>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Parametric Sliders */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-black text-gray-900">Trip Parameter Controls</h2>
                <p className="text-xs text-gray-500">Slide controls to test group sizes, stay options, and travel days</p>
              </div>
            </div>

            {/* Group Size & Duration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-600">Group Size (Persons)</span>
                  <span className="text-[#008CFF] font-mono">{groupSize} persons</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={groupSize}
                  onChange={(e) => setGroupSize(Number(e.target.value))}
                  className="w-full accent-[#008CFF] cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-600">Total Duration (Days)</span>
                  <span className="text-[#008CFF] font-mono">{days} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="21"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-[#008CFF] cursor-pointer"
                />
              </div>
            </div>

            {/* Target Budget Cap */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-600">Target Budget Limit</span>
                <span className="text-gray-900 font-mono font-bold">{formatINR(targetCap)}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="150000"
                step="1000"
                value={targetCap}
                onChange={(e) => setTargetCap(Number(e.target.value))}
                className="w-full accent-[#008CFF] cursor-pointer"
              />
            </div>

            {/* Line Items */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Detailed Expense Splits</h3>

              {/* Transit */}
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Transit & Tolls (Total)</span>
                  <span className="font-mono text-gray-900 font-bold">{formatINR(transitOverride)}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={transitOverride}
                  onChange={(e) => setTransitOverride(Number(e.target.value))}
                  className="w-full accent-[#008CFF]"
                />
              </div>

              {/* Stay / Night */}
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Avg Stay / Night (Room/Dorm)</span>
                  <span className="font-mono text-gray-900 font-bold">{formatINR(stayPerNight)}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="12000"
                  step="200"
                  value={stayPerNight}
                  onChange={(e) => setStayPerNight(Number(e.target.value))}
                  className="w-full accent-[#008CFF]"
                />
              </div>

              {/* Food / Person / Day */}
              <div className="p-3.5 bg-gray-50 rounded-xl space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-700">Food per person / day</span>
                  <span className="font-mono text-gray-900 font-bold">{formatINR(foodPerDayPerPerson)}</span>
                </div>
                <input
                  type="range"
                  min="250"
                  max="2500"
                  step="50"
                  value={foodPerDayPerPerson}
                  onChange={(e) => setFoodPerDayPerPerson(Number(e.target.value))}
                  className="w-full accent-[#008CFF]"
                />
              </div>
            </div>
          </div>

          {/* Right: Visualization & Breakdown Card */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
              <h3 className="text-base font-black text-gray-900">Expense Allocation Chart</h3>

              <div className="h-56 relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={breakdownData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {breakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatINR(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend List */}
              <div className="space-y-2 text-xs">
                {breakdownData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-600 font-medium">{item.name}</span>
                    </div>
                    <span className="font-mono font-bold text-gray-900">{formatINR(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
