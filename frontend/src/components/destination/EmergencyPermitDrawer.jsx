import { useState } from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, FileText, X, CheckCircle, ExternalLink } from 'lucide-react';
import Modal from '../ui/Modal.jsx';

export default function EmergencyPermitDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/20 border border-red-900/40 text-red-400 hover:bg-red-900/40 text-xs font-mono transition-colors"
      >
        <ShieldAlert size={14} className="text-red-400 animate-pulse" />
        <span className="hidden sm:inline">SOS & Permits</span>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="High-Altitude Emergency & Chardham Biometric Protocol"
        subtitle="Verified Uttarakhand State Disaster Management & Medical Directive"
      >
        <div className="space-y-6">
          {/* Biometric Token Protocol */}
          <div className="p-4 bg-[#101512] border border-[#2A342B] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#ACC8A2] font-semibold flex items-center gap-1.5">
                <FileText size={14} /> Mandatory Biometric E-Pass
              </span>
              <a
                href="https://registrationandtouristcare.uk.gov.in"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-mono text-[#ACC8A2] hover:underline flex items-center gap-1"
              >
                Official Portal <ExternalLink size={11} />
              </a>
            </div>
            <p className="text-xs text-[#70786F] leading-relaxed">
              Every traveller ascending past Sonprayag (Kedarnath) or Pandukeshwar (Badrinath) must generate an official QR wristband/pass. Without this, physical checkposts will turn vehicles back.
            </p>
          </div>

          {/* Emergency SOS Hotlines */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-[#ACC8A2] block">Verified Emergency Helpline Matrix</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 bg-[#101512] border border-[#2A342B] flex justify-between items-center">
                <span className="text-[#F5F5F0]">Uttarakhand SDRF:</span>
                <a href="tel:1070" className="text-red-400 font-bold hover:underline">1070 / 112</a>
              </div>
              <div className="p-3 bg-[#101512] border border-[#2A342B] flex justify-between items-center">
                <span className="text-[#F5F5F0]">ITBP Disaster Cell:</span>
                <a href="tel:01352763321" className="text-red-400 font-bold hover:underline">0135-2763321</a>
              </div>
              <div className="p-3 bg-[#101512] border border-[#2A342B] flex justify-between items-center">
                <span className="text-[#F5F5F0]">National Emergency:</span>
                <a href="tel:112" className="text-red-400 font-bold hover:underline">112 (All India)</a>
              </div>
              <div className="p-3 bg-[#101512] border border-[#2A342B] flex justify-between items-center">
                <span className="text-[#F5F5F0]">Ambulance Hotline:</span>
                <a href="tel:108" className="text-red-400 font-bold hover:underline">108 (Mountain Aid)</a>
              </div>
            </div>
          </div>

          {/* AMS Medical Protocol */}
          <div className="p-4 bg-[#101512] border border-amber-900/50 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-400 font-semibold">
              <HeartPulse size={14} /> Acute Mountain Sickness (AMS) Protocol
            </div>
            <ul className="text-xs text-[#70786F] space-y-1 list-disc pl-4 leading-relaxed">
              <li>Acclimatize 1 night at Guptkashi (1,319m) before ascending to Kedarnath (3,583m).</li>
              <li>Hydrate with minimum 3-4 liters of water daily. Avoid alcohol completely.</li>
              <li>Carry portable oxygen cans available at Sonprayag base camp (₹450-₹600).</li>
              <li>If severe nausea, dizziness, or chest tightness occurs, descend immediately.</li>
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
}
