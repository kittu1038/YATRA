import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext.jsx';
import {
  X,
  Sparkles,
  AlertTriangle,
  Compass,
  ArrowRight,
  Send,
  HelpCircle,
  Lightbulb,
  Bot
} from 'lucide-react';
import clsx from 'clsx';

// FSM States
const FSM_STATES = {
  IDLE: 'idle',
  THINKING: 'thinking',
  LISTENING: 'listening',
  ALERT: 'alert',
  TRAVEL_MODE: 'travel_mode',
};

export default function CompanionRobot() {
  const [isOpen, setIsOpen] = useState(false);
  const [fsmState, setFsmState] = useState(FSM_STATES.IDLE);
  const [microAlert, setMicroAlert] = useState(null);
  const [activeMessage, setActiveMessage] = useState('YATRA AI Saathi online. Route, weather aur budget guide karne ke liye ready.');
  const [userInput, setUserInput] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { selectedDestinations, budget } = useTrip();

  // Watch route & context changes to trigger contextual micro-alerts
  useEffect(() => {
    const path = location.pathname;
    const target = budget?.target || 0;
    const total = budget?.total || 0;

    // Check budget cap
    if (target > 0 && total > target * 1.05) {
      setFsmState(FSM_STATES.ALERT);
      setMicroAlert({
        title: 'Budget Alert',
        text: `Aapka estimated expense (₹${(total || 0).toLocaleString('en-IN')}) target budget (₹${(target || 0).toLocaleString('en-IN')}) se badh gaya hai. Hostels choose karein savings ke liye.`,
        actionLabel: 'Check Budget',
        actionPath: '/budget',
      });
      return;
    }

    // Contextual hints per route
    if (path === '/') {
      setFsmState(FSM_STATES.IDLE);
      setActiveMessage('Namaste! Rajasthan ke royal forts explore karein ya Uttarakhand ke sacred Himalayan shrines?');
      setMicroAlert(null);
    } else if (path.includes('/destinations/kedarnath') || path.includes('/destinations/badrinath')) {
      setFsmState(FSM_STATES.ALERT);
      setMicroAlert({
        title: 'High Altitude Yatra Advisory',
        text: 'Kedarnath (3,583m) ke liye biometric registration mandatory hai. Raste me Sonprayag par acclimatization rest zaroor lein.',
        actionLabel: 'Official Yatra Pass Info',
        actionPath: '#permit',
      });
    } else if (path.includes('/budget')) {
      setFsmState(FSM_STATES.TRAVEL_MODE);
      setActiveMessage('Real-time budget calculator me trains, verified hostels aur toll tax included hain.');
      setMicroAlert(null);
    } else if (path.includes('/stays')) {
      setFsmState(FSM_STATES.IDLE);
      setActiveMessage('Sabhi stays 100% verified hain with zero fake markup pricing.');
      setMicroAlert(null);
    } else {
      setFsmState(FSM_STATES.IDLE);
      setActiveMessage('Aapke trip me koyi bhi question ho to mujhse pooch sakte hain!');
      setMicroAlert(null);
    }
  }, [location.pathname, budget?.total, budget?.target, selectedDestinations?.length]);

  const handleSendQuery = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setFsmState(FSM_STATES.THINKING);
    setActiveMessage(`Thinking about: "${userInput}"...`);

    const query = userInput.toLowerCase();
    setTimeout(() => {
      setFsmState(FSM_STATES.IDLE);
      if (query.includes('budget') || query.includes('cost') || query.includes('kharcha')) {
        setActiveMessage('Budget calculator page par aap state-by-state travel expenses dekh sakte hain.');
      } else if (query.includes('kedarnath') || query.includes('yatra') || query.includes('temple')) {
        setActiveMessage('Kedarnath ke liye Haridwar se early morning bus lein aur biometric pass ready rakhein.');
      } else if (query.includes('jaipur') || query.includes('rajasthan')) {
        setActiveMessage('Jaipur me Amer Fort subah 8 baje visit karein to avoid afternoon heat and rush.');
      } else {
        setActiveMessage(`"${userInput}" ke liye humara AI Trip Architect sabse best custom plan generate kar sakta hai.`);
      }
      setUserInput('');
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Modal Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 space-y-4 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-[#008CFF] flex items-center justify-center font-bold">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-gray-900 leading-tight">YATRA AI Saathi</h4>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className={clsx(
                    'w-1.5 h-1.5 rounded-full',
                    fsmState === FSM_STATES.ALERT ? 'bg-amber-500 animate-ping' : 'bg-[#00A86B]'
                  )} />
                  <span className="capitalize">{fsmState} mode</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Active Context Alert Banner */}
          {microAlert && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <AlertTriangle size={14} />
                <span>{microAlert.title}</span>
              </div>
              <p className="text-amber-700 text-[11px] leading-relaxed">
                {microAlert.text}
              </p>
              {microAlert.actionPath && (
                <button
                  onClick={() => {
                    if (microAlert.actionPath.startsWith('/')) {
                      navigate(microAlert.actionPath);
                      setIsOpen(false);
                    }
                  }}
                  className="text-[11px] font-bold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{microAlert.actionLabel}</span>
                  <ArrowRight size={12} />
                </button>
              )}
            </div>
          )}

          {/* Main Message bubble */}
          <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 text-xs text-gray-700 leading-relaxed">
            <p>{activeMessage}</p>
          </div>

          {/* Quick Action Chips */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
              Quick Suggestions
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  navigate('/ai-planner');
                  setIsOpen(false);
                }}
                className="text-[11px] font-semibold bg-blue-50 text-[#008CFF] px-2.5 py-1 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
              >
                Plan Full Trip
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/heritage');
                  setIsOpen(false);
                }}
                className="text-[11px] font-semibold bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                Heritage History
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate('/budget');
                  setIsOpen(false);
                }}
                className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                Budget Split
              </button>
            </div>
          </div>

          {/* Query input */}
          <form onSubmit={handleSendQuery} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask about places, routes, timings..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl text-xs px-3 py-2 text-gray-900 placeholder-gray-400 outline-none focus:border-[#008CFF]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#008CFF] text-white hover:bg-blue-600 transition-colors shadow-sm cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Robot Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'relative p-3.5 rounded-full transition-all duration-300 shadow-xl group cursor-pointer flex items-center justify-center',
          isOpen
            ? 'bg-gray-900 text-white'
            : 'bg-gradient-to-r from-[#53B2FE] via-[#008CFF] to-[#065AF3] text-white hover:shadow-2xl hover:scale-105'
        )}
        title="YATRA AI Saathi"
        aria-label="Open YATRA Assistant"
      >
        <Bot size={26} />

        {/* Micro-badge indicator if alert active */}
        {microAlert && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-gray-900 font-mono text-[9px] font-black flex items-center justify-center animate-bounce shadow">
            !
          </span>
        )}
      </button>
    </div>
  );
}
