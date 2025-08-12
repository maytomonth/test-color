interface AdSlotProps {
  label?: string;
  className?: string;
}

export default function AdSlot({ label = 'Ad Space', className = '' }: AdSlotProps) {
  return (
    <div 
      className={`w-full h-24 md:h-28 lg:h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-white/10 flex items-center justify-center text-sm text-gray-500 ${className}`}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  );
}
