'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/ga';

export default function AnalyticsRouter() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on route change
    pageview(pathname);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
