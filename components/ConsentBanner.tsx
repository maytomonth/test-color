'use client';

import { useState, useEffect } from 'react';
import { hasConsent, setConsent } from '@/lib/ga';

interface ConsentBannerProps {
  ui: {
    consentTitle: string;
    consentMessage: string;
    consentAccept: string;
    consentDecline: string;
  };
}

export default function ConsentBanner({ ui }: ConsentBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if consent has already been given/denied
    const consentGiven = localStorage.getItem('analytics-consent');
    if (consentGiven === null) {
      setShowBanner(true);
    }
    setIsLoaded(true);
  }, []);

  const handleConsent = (consent: boolean) => {
    setConsent(consent);
    setShowBanner(false);
    
    // Reload page if consent is given to load GA scripts
    if (consent) {
      window.location.reload();
    }
  };

  // Don't render anything until we've checked localStorage
  if (!isLoaded || !showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              {ui.consentTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {ui.consentMessage}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleConsent(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {ui.consentDecline}
            </button>
            <button
              onClick={() => handleConsent(true)}
              className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:brightness-95 transition-colors"
              style={{ backgroundColor: '#3B82F6' }}
            >
              {ui.consentAccept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
