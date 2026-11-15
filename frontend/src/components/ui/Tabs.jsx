import clsx from 'clsx';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div className={clsx('flex items-center gap-1 border-b border-[#E5E7EB] overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-3.5 text-xs sm:text-sm font-heading font-bold whitespace-nowrap transition-all border-b-2 -mb-px flex items-center gap-2 cursor-pointer',
              isActive
                ? 'border-[#008CFF] text-[#008CFF]'
                : 'border-transparent text-[#4B5563] hover:text-[#111827] hover:border-[#D1D5DB]'
            )}
          >
            {tab.icon && <tab.icon size={16} className={isActive ? 'text-[#008CFF]' : 'text-[#6B7280]'} />}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className={clsx(
                'text-[11px] font-bold px-2 py-0.5 rounded-full',
                isActive ? 'bg-[#E8F4FF] text-[#008CFF]' : 'bg-[#F3F4F6] text-[#6B7280]'
              )}>
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
