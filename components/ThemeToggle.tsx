// DISABLED: ThemeToggle component - removed from layout for now
// Can be re-enabled later if dark mode feature is needed again

/*
'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => setMounted(true), [])
  
  if (!mounted) return null
  
  const isDark = resolvedTheme === 'dark'
  
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun size={18}/> : <Moon size={18}/>}
    </button>
  )
}
*/

// Placeholder export to avoid import errors
export function ThemeToggle() {
  return null;
}
