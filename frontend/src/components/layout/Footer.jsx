import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Sparkles, MapPin, Heart, CreditCard, Lock, Award } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E5E7EB] pt-14 pb-12 mt-auto">
      <div className="page-container">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-[#F3F4F6] text-xs">
          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            <ShieldCheck size={22} className="text-[#008CFF] shrink-0" />
            <div>
              <span className="font-bold text-[#111827] block">100% Deterministic Math</span>
              <span className="text-[#6B7280]">Zero AI budget hallucination</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            <Award size={22} className="text-[#00A86B] shrink-0" />
            <div>
              <span className="font-bold text-[#111827] block">Verified Hostels & Hotels</span>
              <span className="text-[#6B7280]">Real INR rates & amenities</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            <Lock size={22} className="text-[#FF6D38] shrink-0" />
            <div>
              <span className="font-bold text-[#111827] block">Sacred Travel Protocol</span>
              <span className="text-[#6B7280]">Chardham biometric guidance</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
            <CreditCard size={22} className="text-[#9333EA] shrink-0" />
            <div>
              <span className="font-bold text-[#111827] block">Bill Split & UPI Ready</span>
              <span className="text-[#6B7280]">Equal division with friends</span>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 py-10 border-b border-[#F3F4F6]">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-tr from-[#065AF3] to-[#53B2FE] rounded-lg flex items-center justify-center shadow-xs">
                <span className="font-heading font-black text-sm text-white">Y</span>
              </div>
              <div className="flex items-center">
                <span className="font-heading font-black tracking-tight text-xl text-[#111827]">
                  yatra
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D38] ml-0.5" />
              </div>
            </div>
            <p className="text-sm text-[#4B5563] max-w-sm leading-relaxed">
              India's modern, ultra-reliable travel discovery portal. Seamlessly plan multi-stop royal Rajasthan havelis, holy Chardham circuits, and Himalayan yoga retreats with honest pricing.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#008CFF]">
              <span>Made with care for travellers across Bharat</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Popular Circuits
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4B5563]">
              <li>
                <Link to="/destinations/jaipur" className="hover:text-[#008CFF] transition-colors">
                  Jaipur Pink City
                </Link>
              </li>
              <li>
                <Link to="/destinations/udaipur" className="hover:text-[#008CFF] transition-colors">
                  Udaipur Lake Citadel
                </Link>
              </li>
              <li>
                <Link to="/destinations/rishikesh" className="hover:text-[#008CFF] transition-colors">
                  Rishikesh Yoga & Rapids
                </Link>
              </li>
              <li>
                <Link to="/destinations/kedarnath" className="hover:text-[#008CFF] transition-colors">
                  Kedarnath High Altitude
                </Link>
              </li>
              <li>
                <Link to="/destinations/badrinath" className="hover:text-[#008CFF] transition-colors">
                  Badrinath Thermal Springs
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Smart Planning
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#4B5563]">
              <li>
                <Link to="/budget" className="hover:text-[#008CFF] transition-colors">
                  Budget Calculator Engine
                </Link>
              </li>
              <li>
                <Link to="/route-planner" className="hover:text-[#008CFF] transition-colors">
                  2-Opt Route TSP Optimizer
                </Link>
              </li>
              <li>
                <Link to="/ai-planner" className="hover:text-[#008CFF] transition-colors">
                  AI Day-by-Day Scheduler
                </Link>
              </li>
              <li>
                <Link to="/heritage" className="hover:text-[#008CFF] transition-colors">
                  HeritageGPT Cultural Dossiers
                </Link>
              </li>
              <li>
                <Link to="/my-trip" className="hover:text-[#008CFF] transition-colors">
                  My Trip Command Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#111827]">
              Need Assistance?
            </h4>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Check out our high-altitude acclimatization guide and live Chardham biometric permit tracking before you travel.
            </p>
            <div className="p-3 bg-[#F0F7FF] border border-[#CCE4FF] rounded-xl text-xs font-medium text-[#008CFF]">
              State Disaster Helpline: <strong>1070</strong> / <strong>112</strong>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6B7280]">
          <div>
            © {new Date().getFullYear()} YATRA Online Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/destinations" className="hover:text-[#111827]">Privacy Policy</Link>
            <Link to="/destinations" className="hover:text-[#111827]">Terms of Service</Link>
            <Link to="/destinations" className="hover:text-[#111827]">Security & Permits</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
