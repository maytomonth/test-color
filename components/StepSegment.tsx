'use client';

interface StepSegmentProps {
  total: number;
  current: number;
}

export function StepSegment({ total, current }: StepSegmentProps) {
  return (
    <div className="flex justify-center mt-8">
      <div 
        className="flex space-x-2 w-full max-w-md"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-label={`단계 진행률: ${current}/${total}`}
      >
        {Array.from({ length: total }, (_, index) => (
          <div
            key={index}
            className={`h-2 md:h-2.5 rounded motion-safe:transition-all motion-safe:duration-300 ease-out ${
              index >= current ? 'bg-gray-300 dark:bg-gray-700' : ''
            }`}
            style={{
              backgroundColor: index < current ? '#3B82F6' : undefined
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default StepSegment;
