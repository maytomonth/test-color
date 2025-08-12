import 'server-only';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export type Locale = 'ko' | 'en';

export function getLocaleFromContext(): Locale {
  // For now, default to 'ko' since we don't have dynamic locale detection yet
  // This can be enhanced later with proper i18n routing
  return 'ko';
}

function loadUIData(locale: Locale) {
  try {
    const uiPath = join(process.cwd(), 'public', 'locales', locale, 'ui.json');
    return JSON.parse(readFileSync(uiPath, 'utf8'));
  } catch (error) {
    return {};
  }
}

export function getHomeMeta(locale: Locale): { title: string; description: string } {
  const uiData = loadUIData(locale);
  const siteTitle = uiData.siteTitle || (locale === 'ko' ? '퍼스널 컬러 테스트' : 'Personal Color Test');
  const siteTagline = uiData.siteTagline || (locale === 'ko' ? '8문항으로 3분 만에 나의 퍼스널 컬러 찾기' : 'Find your personal color in 3 minutes with 8 questions');
  
  return {
    title: `${siteTitle} — ${siteTagline}`,
    description: uiData.homeMetaDesc || (locale === 'ko' 
      ? '간단한 8개 문항으로 봄·여름·가을·겨울 중 당신의 퍼스널 컬러를 확인하고, 어울리는 팔레트와 스타일 팁을 받아보세요.'
      : 'Discover your best season (Spring/Summer/Autumn/Winter) and get a matching palette & tips.')
  };
}

export function getTestMeta(locale: Locale): { title: string; description: string } {
  const uiData = loadUIData(locale);
  
  return {
    title: uiData.testMetaTitle || (locale === 'ko' ? '테스트 진행 | 퍼스널 컬러 테스트' : 'Take the Test | Personal Color'),
    description: uiData.testMetaDesc || (locale === 'ko' 
      ? '문항을 차근차근 선택하고 나에게 맞는 색감을 찾아보세요.'
      : 'Answer step by step and reveal your best colors.')
  };
}

export function getResultMeta(locale: Locale): { title: string; description: string } {
  const uiData = loadUIData(locale);
  
  return {
    title: uiData.resultMetaTitle || (locale === 'ko' ? '나의 퍼스널 컬러 결과' : 'Your Personal Color Result'),
    description: uiData.resultMetaDesc || (locale === 'ko' 
      ? '당신에게 가장 어울리는 시즌 타입과 추천 팔레트를 확인하세요.'
      : 'See your top season type and recommended palette.')
  };
}

// Legacy function for backward compatibility
export function getLocalizedMeta(locale: Locale): { title: string; description: string } {
  return getHomeMeta(locale);
}

export function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://personal-color-test.vercel.app';
}

export function generateHreflangAlternates() {
  const baseUrl = getBaseUrl();
  return {
    languages: {
      'ko': `${baseUrl}/?lang=ko`,
      'en': `${baseUrl}/?lang=en`,
      'x-default': baseUrl
    }
  };
}

export function getAbsoluteUrl(path: string = ''): string {
  const baseUrl = getBaseUrl();
  return `${baseUrl}${path}`;
}
