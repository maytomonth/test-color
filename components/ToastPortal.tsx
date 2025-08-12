'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ToastPortalProps {
  message: string;
  show: boolean;
  onClose?: () => void;
  duration?: number;
}

export function ToastPortal({ message, show, onClose, duration = 3000 }: ToastPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!mounted || !show) return null;

  return createPortal(
    <div
      className={`
        fixed bottom-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white bg-black/80 text-sm 
        motion-safe:transition-all motion-safe:duration-300 flex items-center gap-2 z-[1000]
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
      `}
      role="alert"
      aria-live="polite"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>,
    document.body
  );
}

export default ToastPortal;
