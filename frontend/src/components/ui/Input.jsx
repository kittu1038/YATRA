import clsx from 'clsx';

export default function Input({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-[#4B5563] flex items-center justify-between">
          <span>{label}</span>
          {props.required && <span className="text-red-500 text-xs">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-[#9CA3AF] pointer-events-none">
            <Icon size={18} />
          </div>
        )}
        <input
          className={clsx(
            'w-full bg-white border text-[#111827] placeholder-[#9CA3AF] text-sm font-medium rounded-lg transition-all duration-200 outline-none',
            Icon ? 'pl-11 pr-4 py-2.5' : 'px-4 py-2.5',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-[#D1D5DB] focus:border-[#008CFF] focus:ring-2 focus:ring-[#008CFF]/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
      {helperText && !error && <p className="text-[#6B7280] text-xs">{helperText}</p>}
    </div>
  );
}
