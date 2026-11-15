import clsx from 'clsx';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) {
  const variants = {
    default: 'bg-[#F3F4F6] text-[#4B5563] border border-[#E5E7EB]',
    blue: 'bg-[#E8F4FF] text-[#008CFF] border border-[#CCE4FF]',
    green: 'bg-[#E6F7F0] text-[#00A86B] border border-[#B3E8D3]',
    rating: 'bg-[#00A86B] text-white font-bold shadow-xs',
    orange: 'bg-[#FFF0EB] text-[#FF6D38] border border-[#FFD9CC]',
    red: 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]',
    purple: 'bg-[#F3E8FF] text-[#9333EA] border border-[#E9D5FF]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-semibold',
    md: 'text-xs px-2.5 py-1 rounded-md font-semibold',
    lg: 'text-sm px-3 py-1.5 rounded-lg font-semibold',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
