"use client"

import { useEffect } from "react"

interface ToastProps {
  message: string
  show: boolean
}

export default function Toast({ message, show }: ToastProps) {
  if (!show) return null

  return (
    <div
      className={`
        fixed bottom-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white bg-black/80 text-sm 
        transition-all duration-300 flex items-center gap-2 z-50
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
      role="alert"
      aria-live="polite"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  )
}
