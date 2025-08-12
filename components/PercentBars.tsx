'use client';

import { getTypeColor } from '@/lib/typeColors';

interface PercentBarsProps {
  results: Array<{
    type: string;
    score: number;
    percent: number;
  }>;
  locale?: string;
  className?: string;
}

const typeLabels = {
  ko: {
    spring: '봄',
    summer: '여름',
    fall: '가을',
    winter: '겨울',
  },
  en: {
    spring: 'Spring',
    summer: 'Summer',
    fall: 'Fall',
    winter: 'Winter',
  }
};

export default function PercentBars({ results, locale = 'ko', className = '' }: PercentBarsProps) {
  // 빈 데이터 처리
  if (!results || results.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <div className="text-gray-500 text-sm">
          표시할 데이터가 없습니다
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {results.map((item, index) => (
        <div key={item.type} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: getTypeColor(item.type) }}
              ></div>
              <span className="text-gray-900 text-sm font-medium">
                {typeLabels[locale as keyof typeof typeLabels]?.[item.type as keyof typeof typeLabels.ko] || item.type}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {item.percent}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${item.percent}%`,
                backgroundColor: getTypeColor(item.type),
                animationDelay: `${index * 100}ms`
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
