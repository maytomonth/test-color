export type Locale = 'ko' | 'en';

export interface Question {
  id: string;
  type: string;
  text: string;
  tip?: string;
  choices: Array<{
    label: string;
    value: string;
    color?: string;
    image?: string;
    description?: string;
  }>;
}

export interface Result {
  id: string;
  label: string;
  description: string;
  colors: string[];
}

export interface UIMessages {
  title: string;
  siteTitle?: string;
  siteTagline?: string;
  siteDescription?: string;
  homeMetaDesc?: string;
  testMetaTitle?: string;
  testMetaDesc?: string;
  resultMetaTitle?: string;
  resultMetaDesc?: string;
  start: string;
  next: string;
  result: string;
  share?: string;
  retry?: string;
  progress?: string;
  prev?: string;
  first?: string;
  adPlaceholder?: string;
  consentTitle?: string;
  consentMessage?: string;
  consentAccept?: string;
  consentDecline?: string;
  copied?: string;
  top2?: string;
  needTestFirst?: string;
  noData?: string;
  noPalette?: string;
  heroDescription?: string;
  featureSimpleTitle?: string;
  featureSimpleDesc?: string;
  featurePersonalTitle?: string;
  featurePersonalDesc?: string;
  featurePracticalTitle?: string;
  featurePracticalDesc?: string;
  testDuration?: string;
  match?: string;
  yourPalette?: string;
  detailedAnalysis?: string;
  nextSteps?: string;
  retakeTest?: string;
  shareResult?: string;
  backHome?: string;
  stylingTips?: string;
  howToUse?: string;
  yourColorPalette?: string;
  copyColorCode?: string;
  secondBestMatch?: string;
  matchRate?: string;
  stylingTip1?: string;
  stylingTip2?: string;
  stylingTip3?: string;
  stylingTip4?: string;
  usageGuide?: string;
  usage1?: string;
  usage2?: string;
  usage3?: string;
  usage4?: string;
  disclaimer?: string;
}

/**
 * 초기 로케일을 결정합니다.
 * 우선순위: URL ?lang > localStorage.lang > navigator.language
 */
export function getInitialLocale(): Locale {
  // 1. URL 파라미터 확인
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam === 'ko' || langParam === 'en') {
      return langParam as Locale;
    }

    // 2. localStorage 확인
    const storedLang = localStorage.getItem('lang');
    if (storedLang === 'ko' || storedLang === 'en') {
      return storedLang as Locale;
    }

    // 3. navigator.language 확인
    const browserLang = navigator.language;
    if (browserLang.includes('ko')) {
      return 'ko';
    }
  }

  // 기본값: 영어
  return 'en';
}

/**
 * 로케일을 설정하고 저장합니다.
 */
export function setLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lang', locale);
    // 간단히 페이지 새로고침으로 언어 변경 적용
    window.location.reload();
  }
}

/**
 * UI 메시지를 로드합니다.
 */
export async function loadUIMessages(locale: Locale): Promise<UIMessages> {
  try {
    const response = await fetch(`/locales/${locale}/ui.json`);
    if (!response.ok) {
      throw new Error(`Failed to load UI messages for ${locale}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading UI messages:', error);
    // 기본값 반환
    return {
      title: locale === 'ko' ? '퍼스널 컬러 테스트' : 'Personal Color Test',
      start: locale === 'ko' ? '시작하기' : 'Start',
      next: locale === 'ko' ? '다음' : 'Next',
      result: locale === 'ko' ? '결과 보기' : 'See Result',
    };
  }
}

/**
 * 질문 데이터를 로드합니다.
 */
export async function loadQuestions(locale: Locale): Promise<Question[]> {
  try {
    const response = await fetch(`/locales/${locale}/questions.json`);
    if (!response.ok) {
      throw new Error(`Failed to load questions for ${locale}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading questions:', error);
    return [];
  }
}

/**
 * 결과 데이터를 로드합니다.
 */
export async function loadResults(locale: Locale): Promise<Result[]> {
  try {
    const response = await fetch(`/locales/${locale}/results.json`);
    if (!response.ok) {
      throw new Error(`Failed to load results for ${locale}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading results:', error);
    return [];
  }
}

/**
 * 간단한 번역 함수 - 키가 없을 경우 안전한 폴백 제공
 */
export function t(key: string, dict: Record<string, string>): string {
  return dict[key] || `[${key}]`;
}
