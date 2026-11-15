import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useTrip } from '../../context/TripContext.jsx';
import AmbientSoundPlayer from '../ui/AmbientSoundPlayer.jsx';
import EmergencyPermitDrawer from '../destination/EmergencyPermitDrawer.jsx';
import {
  Compass,
  MapPin,
  Calendar,
  Wallet,
  Sparkles,
  BookOpen,
  Menu,
  X,
  LogOut,
  Shield,
  User,
  ArrowRight,
  Luggage,
  PhoneCall
} from 'lucide-react';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const navItems = [
  { to: '/destinations', label: 'Explore India', icon: Compass },
  { to: '/stays', label: 'Hotels & Hostels', icon: MapPin },
  { to: '/budget', label: 'Budget Calculator', icon: Wallet },
  { to: '/route-planner', label: 'Routes (2-Opt)', icon: Calendar },
  { to: '/ai-planner', label: 'AI Trip Planner', icon: Sparkles },
  { to: '/heritage', label: 'HeritageGPT', icon: BookOpen },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { selectedDestinations, budget } = useTrip();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Signed out safely');
      setUserDropdownOpen(false);
      navigate('/');
    } catch (err) {
      toast.error('Logout error');
    }
  };

  const stopCount = selectedDestinations?.length || 0;
  const totalCostINR = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(budget?.total || 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs">
      <div className="page-container flex items-center justify-between h-16 sm:h-18">
        {/* Brand Logo */}
        <div className="flex items-center gap-6 xl:gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-tr from-[#065AF3] to-[#53B2FE] rounded-xl flex items-center justify-center shadow-sm">
              <span className="font-heading font-black text-base text-white tracking-tighter">
                Y
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="font-heading font-black tracking-tight text-xl text-[#111827]">
                  yatra
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D38] ml-0.5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] -mt-1">
                India Travel Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'px-3 py-2 text-xs xl:text-sm font-heading font-semibold tracking-normal transition-all rounded-lg',
                    isActive
                      ? 'text-[#008CFF] bg-[#E8F4FF]'
                      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Right Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Ambient Sound Synthesizer */}
          <AmbientSoundPlayer />

          {/* Emergency SOS & Permits */}
          <EmergencyPermitDrawer />

          {/* Active Trip Sync Pill */}
          <Link
            to="/my-trip"
            className="flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#008CFF] hover:bg-[#F0F7FF] rounded-full transition-all group cursor-pointer shadow-2xs"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#00A86B] animate-pulse" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-bold uppercase text-[#6B7280] leading-none">
                My Trip ({stopCount})
              </span>
              <span className="text-xs font-bold text-[#111827] group-hover:text-[#008CFF] transition-colors font-mono">
                {totalCostINR}
              </span>
            </div>
          </Link>

          {/* User Auth Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#008CFF] rounded-full text-xs font-bold text-[#111827] transition-all cursor-pointer"
              >
                <div className="w-6 h-6 bg-[#008CFF] text-white rounded-full flex items-center justify-center font-bold text-xs shadow-2xs">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="max-w-[100px] truncate">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] shadow-xl rounded-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-[#F3F4F6]">
                    <p className="text-xs font-bold text-[#111827] truncate">{user.name}</p>
                    <p className="text-[11px] text-[#6B7280] truncate">{user.email}</p>
                  </div>

                  <Link
                    to="/my-trip"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#4B5563] hover:text-[#008CFF] hover:bg-[#F0F7FF] transition-colors"
                  >
                    <Luggage size={15} className="text-[#008CFF]" />
                    <span>My Trip Dashboard</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-[#4B5563] hover:text-amber-600 hover:bg-amber-50 transition-colors"
                    >
                      <Shield size={15} className="text-amber-500" />
                      <span>Admin Moderation</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors border-t border-[#F3F4F6] mt-1 text-left cursor-pointer"
                  >
                    <LogOut size={15} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-heading font-bold text-[#4B5563] hover:text-[#008CFF] transition-colors"
              >
                Login or Create Account
              </Link>
              <Link
                to="/register"
                className="btn-primary text-xs py-2 px-4.5"
              >
                Join Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <EmergencyPermitDrawer />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#4B5563] hover:text-[#008CFF] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Over Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-[#E5E7EB] px-4 py-5 space-y-4 shadow-lg animate-in fade-in duration-150">
          <div className="flex items-center justify-between p-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#6B7280] block">Active Itinerary</span>
              <span className="text-sm font-bold text-[#008CFF] font-mono">{stopCount} stops • {totalCostINR}</span>
            </div>
            <Link
              to="/my-trip"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-[#008CFF] flex items-center gap-1"
            >
              View <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  clsx(
                    'p-3 border rounded-xl text-xs font-heading font-bold flex items-center gap-2',
                    isActive
                      ? 'border-[#008CFF] bg-[#E8F4FF] text-[#008CFF]'
                      : 'border-[#E5E7EB] bg-white text-[#4B5563]'
                  )
                }
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-[#F3F4F6] flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-xs text-[#6B7280] px-1 font-medium">
                  Signed in as <span className="text-[#111827] font-bold">{user.name}</span>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 text-xs font-bold border border-amber-200 text-amber-700 bg-amber-50 rounded-xl"
                  >
                    Admin Moderation
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 text-xs font-bold border border-red-200 text-red-600 bg-red-50 rounded-xl cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2.5 border border-[#E5E7EB] text-xs font-bold text-[#111827] rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary text-center py-2.5 text-xs font-bold"
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
