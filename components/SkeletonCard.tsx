'use client';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div 
      className={`
        rounded-xl h-24 animate-pulse bg-gray-200/70 dark:bg-gray-700 
        motion-safe:transition-all motion-safe:duration-500
        ${className}
      `}
      aria-hidden="true"
    />
  );
}

export default SkeletonCard;
