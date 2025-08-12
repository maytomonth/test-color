'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percentage = ((current + 1) / total) * 100;

  return (
    <div 
      className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-2 md:h-2.5 overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={`진행률: ${current + 1}/${total} (${Math.round(percentage)}%)`}
    >
      <div
        className="h-2 md:h-2.5 rounded-full motion-safe:transition-all motion-safe:duration-300 ease-out"
        style={{ width: `${percentage}%`, backgroundColor: '#3B82F6' }}
      />
    </div>
  );
}
