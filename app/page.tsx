'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { getInitialLocale, loadUIMessages, type UIMessages } from '@/lib/i18n';
import { gaStartTest } from '@/lib/ga-events';
import AdSlot from '@/components/AdSlot';

export default function Home() {
  const [uiMessages, setUIMessages] = useState<UIMessages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [locale, setLocale] = useState<string>('ko');
  const router = useRouter();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const currentLocale = getInitialLocale();
        setLocale(currentLocale);
        const messages = await loadUIMessages(currentLocale);
        setUIMessages(messages);
      } catch (error) {
        console.error('Error loading UI messages:', error);
        // 기본값 설정
        setUIMessages({
          title: '퍼스널 컬러 테스트',
          start: '시작하기',
          next: '다음',
          result: '결과 보기',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  if (isLoading || !uiMessages) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-pulse">
          <div className="h-16 bg-gray-200 rounded mb-6"></div>
          <div className="h-6 bg-gray-200 rounded mb-8 max-w-2xl mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <div className="inline-block rounded-xl bg-black/20 dark:bg-black/30 backdrop-blur px-4 py-2">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            {uiMessages.siteTitle}
          </h1>
          <p className="mt-3 text-base md:text-lg text-white/90">
            {uiMessages.siteTagline}
          </p>
        </div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-white/90 mt-8 mb-8 max-w-2xl mx-auto">
          {uiMessages.heroDescription}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{uiMessages.featureSimpleTitle}</h3>
            <p className="text-gray-600 text-sm">
              {uiMessages.featureSimpleDesc}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{uiMessages.featurePersonalTitle}</h3>
            <p className="text-gray-600 text-sm">
              {uiMessages.featurePersonalDesc}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{uiMessages.featurePracticalTitle}</h3>
            <p className="text-gray-600 text-sm">
              {uiMessages.featurePracticalDesc}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            gaStartTest({ locale });
            router.push('/test');
          }}
          className="text-white hover:brightness-95 active:brightness-90 rounded-full px-6 py-3 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          style={{ backgroundColor: '#3B82F6' }}
        >
          {uiMessages.start}
          <span className="ml-2">→</span>
        </button>
      </div>

      <div className="text-center text-gray-500 text-sm mb-8">
        <p>{uiMessages.testDuration}</p>
      </div>
      
      {/* Ad Slot */}
      <AdSlot label={uiMessages.adPlaceholder || '스폰서 영역'} className="mt-8" />
    </div>
  );
}
