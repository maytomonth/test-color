'use client';

interface ChoiceCardProps {
  label: string;
  description?: string;
  color?: string;
  image?: string;
  colors?: string[];
  isSelected: boolean;
  onClick: () => void;
}

export function ChoiceCard({ 
  label, 
  description, 
  color, 
  image, 
  colors, 
  isSelected, 
  onClick 
}: ChoiceCardProps) {
  return (
    <button
      onClick={onClick}
      role="radio"
      aria-checked={isSelected}
      aria-label={label}
      className={`
        group relative rounded-xl shadow-sm border-2 motion-safe:transition-all motion-safe:duration-200 
        p-4 text-left min-h-[64px] md:min-h-[72px]
        hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand/50
        ${
          isSelected
            ? "border-brand ring-2 ring-brand/30 bg-brand/5"
            : "border-gray-200 dark:border-gray-600 hover:border-brand bg-white dark:bg-[#1F2937]"
        }
      `}
    >
      {/* Color Palette Display */}
      {colors && (
        <div className="flex gap-1 mb-3">
          {colors.map((colorHex, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
              style={{ backgroundColor: colorHex }}
            />
          ))}
        </div>
      )}

      {/* Single Color Display */}
      {color && (
        <div 
          className="w-full h-24 rounded-lg mb-3 shadow-sm"
          style={{ backgroundColor: color }}
        />
      )}

      {/* Choice Image */}
      {image && (
        <div className="mb-3">
          <img
            src={image}
            alt={label}
            className="w-full h-24 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Choice Text */}
      <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
        {label}
      </h3>
      
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </button>
  );
}
