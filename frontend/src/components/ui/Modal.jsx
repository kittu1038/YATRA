import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-lg',
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl p-6 sm:p-7 z-10 animate-in fade-in zoom-in-95 duration-200`}
        role="dialog"
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#F3F4F6] mb-5">
          <div>
            <h3 className="text-xl font-heading font-bold text-[#111827]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-[#6B7280] mt-1 font-medium">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-[#9CA3AF] hover:text-[#111827] p-1.5 rounded-full hover:bg-[#F3F4F6] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[75vh] overflow-y-auto pr-1">
          {children}
        </div>
      </div>
    </div>
  );
}
