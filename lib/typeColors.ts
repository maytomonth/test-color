export function getTypeColor(type: string): string {
  const typeColors = {
    spring: '#F59E0B', // amber-500
    summer: '#3B82F6', // blue-500
    fall: '#EA580C',   // orange-600
    winter: '#8B5CF6', // violet-500
  };
  
  return typeColors[type as keyof typeof typeColors] || '#6B7280'; // gray-500 fallback
}
