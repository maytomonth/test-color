'use client';

import { useState } from 'react';

type PaletteGridProps = { 
  colors: string[];
  onColorClick?: (hex: string) => void;
};

function getTextColor(hex: string) {
  const c = hex.replace('#','');
  if (c.length !== 6) return 'text-gray-900';
  const r = parseInt(c.substring(0,2),16);
  const g = parseInt(c.substring(2,4),16);
  const b = parseInt(c.substring(4,6),16);
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  return luminance > 0.6 ? 'text-gray-900' : 'text-white';
}

export function PaletteGrid({ colors, onColorClick }: PaletteGridProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleColorClick = async (color: string) => {
    if (onColorClick) {
      onColorClick(color);
    } else {
      // 기본 동작: 클립보드에 복사
      try {
        await navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 2000);
      } catch (err) {
        console.error('Failed to copy color:', err);
      }
    }
  };

  // 빈 데이터 처리
  if (!colors || colors.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 text-sm">
          팔레트가 비어있습니다
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handleColorClick(color)}
            className="group relative aspect-square rounded-xl shadow-sm border border-gray-200 dark:border-gray-600 overflow-hidden hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            style={{ backgroundColor: color }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              {copiedColor === color ? (
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">✓</span>
              ) : (
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity">📋</span>
              )}
            </div>
            <div
              className="absolute bottom-1 left-1 right-1 text-xs font-mono px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                backgroundColor: "rgba(0,0,0,0.8)",
                color: "white",
                fontSize: "10px",
              }}
            >
              {color}
            </div>
          </button>
        ))}
      </div>
      {copiedColor && (
        <p className="text-sm text-green-600 dark:text-green-400 mt-2 text-center">
          색상이 복사되었습니다: {copiedColor}
        </p>
      )}
    </div>
  );
}
