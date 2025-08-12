"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed bottom-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white bg-black/80 text-sm 
        transition-opacity duration-300 flex items-center gap-2 z-50
        ${isVisible ? "opacity-100" : "opacity-0"}
      `}
      role="alert"
      aria-live="polite"
    >
      <Check className="w-4 h-4" />
      {message}
    </div>
  )
}
