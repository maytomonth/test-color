// GA4 Integration with consent management
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const isProd = process.env.NODE_ENV === 'production';

// Check if user has consented to analytics
export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('analytics-consent') === 'true';
}

// Set consent status
export function setConsent(consent: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('analytics-consent', consent.toString());
}

// Check if GA should be active
export function isGAActive(): boolean {
  return isProd && !!GA_ID && hasConsent();
}

// Track page views
export function pageview(url: string): void {
  if (!isGAActive() || !window.gtag) return;
  
  window.gtag('config', GA_ID, {
    page_path: url,
  });
}

// Track custom events
export function event(name: string, params: Record<string, any> = {}): void {
  if (!isGAActive() || !window.gtag) return;
  
  window.gtag('event', name, params);
}

// Typed event helpers for personal color test
export function startTest(): void {
  event('start_test', {
    event_category: 'engagement',
    event_label: 'quiz_start'
  });
}

export function answerQuestion(questionId: string, choice: string): void {
  event('answer_question', {
    event_category: 'engagement',
    event_label: 'quiz_answer',
    question_id: questionId,
    choice: choice
  });
}

export function viewResult(topType: string, secondType?: string): void {
  event('view_result', {
    event_category: 'conversion',
    event_label: 'quiz_complete',
    top_type: topType,
    second_type: secondType
  });
}

export function shareResult(platform: string): void {
  event('share_result', {
    event_category: 'engagement',
    event_label: 'result_share',
    platform: platform
  });
}
