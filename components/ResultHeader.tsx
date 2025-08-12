'use client';

interface ResultHeaderProps {
  label: string;
  description: string;
  percent: number;
  colors?: string[];
  className?: string;
}

function isLight(hex: string) { 
  const c = (hex || '').replace('#',''); 
  if (c.length !== 6) return true;
  const r = parseInt(c.slice(0,2),16), g = parseInt(c.slice(2,4),16), b = parseInt(c.slice(4,6),16);
  const L = (0.299*r + 0.587*g + 0.114*b) / 255; 
  return L > 0.7; 
}

export default function ResultHeader({ 
  label, 
  description, 
  percent, 
  colors = [],
  className = '' 
}: ResultHeaderProps) {
  // Use first two colors from palette, fallback to default gradient
  const gradientColors = colors.length >= 2 
    ? [colors[0], colors[1]]
    : colors.length === 1 
    ? [colors[0], '#8B5CF6']
    : ['#3B82F6', '#8B5CF6'];
    
  const gradientStyle = {
    background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
  };

  // Dynamic text contrast based on first palette color
  const base = Array.isArray(colors) && colors[0] ? colors[0] : '#ffffff';
  const lightBg = isLight(base);
  const titleCls = lightBg ? '!text-gray-900' : '!text-white';
  const descCls = lightBg ? '!text-gray-800' : '!text-white/90';
  const badgeBg = lightBg ? 'bg-gray-900/10' : 'bg-white/80';
  const badgeTxt = 'text-gray-900';

  return (
    <div 
      className={`rounded-xl shadow-lg border-0 overflow-hidden ${className}`}
      style={gradientStyle}
    >
      <div className="p-8 md:p-12 text-center">
        <span className={`mt-4 inline-block rounded-full px-4 py-1 text-sm font-medium shadow-sm mb-6 ${badgeBg} ${badgeTxt}`}>
          {percent}% 일치
        </span>
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight mb-4 ${titleCls}`}>
          {label}
        </h1>
        <p className={`mt-2 text-base md:text-lg max-w-2xl mx-auto ${descCls}`}>
          {description}
        </p>
      </div>
    </div>
  );
}
