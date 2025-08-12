'use client';

import { useState, useEffect } from 'react';
import { getInitialLocale, setLocale, type Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  useEffect(() => {
    setCurrentLocale(getInitialLocale());
  }, []);

  const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value as Locale;
    setLocale(locale);
  };

  return (
    <select
      value={currentLocale}
      onChange={handleLocaleChange}
      className="
        h-9 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-800 shadow-sm
        hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        dark:bg-white dark:text-gray-900
      "
      aria-label="언어 선택"
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}
