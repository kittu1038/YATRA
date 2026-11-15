import clsx from 'clsx';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-heading font-bold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';
  
  const variants = {
    primary: 'bg-gradient-to-r from-[#53B2FE] to-[#065AF3] text-white hover:from-[#40A4F8] hover:to-[#0348C9] shadow-md hover:shadow-lg rounded-full border-none',
    secondary: 'bg-[#008CFF]/10 text-[#008CFF] hover:bg-[#008CFF]/20 rounded-full border-none',
    outline: 'bg-white text-[#008CFF] border-1.5 border-[#008CFF] hover:bg-[#F0F7FF] rounded-full',
    ghost: 'bg-transparent text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-lg',
    green: 'bg-[#00A86B] text-white hover:bg-[#00925D] shadow-sm rounded-full',
    orange: 'bg-[#FF6D38] text-white hover:bg-[#F25A22] shadow-sm rounded-full',
    danger: 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-full',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : children}
    </button>
  );
}
