'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { getInitialLocale, loadUIMessages, loadResults, type UIMessages, type Result } from '@/lib/i18n';
import { useQuiz } from '@/context/QuizContext';
import type { PersonalColorResult } from '@/types/quiz';
import { gaViewResult, gaShareResult } from '@/lib/ga-events';
import ResultHeader from '@/components/ResultHeader';
import { PaletteGrid } from '@/components/PaletteGrid';
import PercentBars from '@/components/PercentBars';
import ShareButton from '@/components/ShareButton';
import AdSlot from '@/components/AdSlot';
import Toast from '@/components/Toast';
import ToastPortal from '@/components/ToastPortal';
import SkeletonCard from '@/components/SkeletonCard';

export default function ResultPage() {
  const [result, setResult] = useState<PersonalColorResult | null>(null);
  const [resultData, setResultData] = useState<Result | null>(null);
  const [secondResultData, setSecondResultData] = useState<Result | null>(null);
  const [uiMessages, setUIMessages] = useState<UIMessages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<string>('ko');
  const [hasTrackedView, setHasTrackedView] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const { reset } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        // sessionStorage에서 결과 로드 및 라우트 가드
        const storedResult = sessionStorage.getItem('pctResult');
        if (!storedResult) {
          // 현재 로케일 로드하여 적절한 메시지 표시
          const currentLocale = getInitialLocale();
          const uiData = await loadUIMessages(currentLocale);
          setToastMessage(uiData.needTestFirst || '테스트부터 진행해주세요');
          setShowToast(true);
          
          // 토스트 표시 후 리다이렉트
          setTimeout(() => {
            router.push('/test');
          }, 1000);
          return;
        }

        let parsedResult: PersonalColorResult;
        try {
          parsedResult = JSON.parse(storedResult);
          // 결과 데이터 유효성 검증
          if (!parsedResult.topType || !parsedResult.results || !Array.isArray(parsedResult.results)) {
            throw new Error('Invalid result data');
          }
        } catch (parseError) {
          // 잘못된 데이터인 경우 세션스토리지 정리하고 리다이렉트
          sessionStorage.removeItem('pctResult');
          const currentLocale = getInitialLocale();
          const uiData = await loadUIMessages(currentLocale);
          setToastMessage(uiData.needTestFirst || '테스트부터 진행해주세요');
          setShowToast(true);
          
          setTimeout(() => {
            router.push('/test');
          }, 1000);
          return;
        }
        setResult(parsedResult);

        // 현재 로케일 데이터 로드
        const currentLocale = getInitialLocale();
        setLocale(currentLocale);
        const [uiData, resultsData] = await Promise.all([
          loadUIMessages(currentLocale),
          loadResults(currentLocale)
        ]);
        
        setUIMessages(uiData);
        
        // Top1과 Top2 결과 데이터 찾기
        const topResult = resultsData.find(r => r.id === parsedResult.topType);
        const secondResult = resultsData.find(r => r.id === parsedResult.secondType);
        
        setResultData(topResult || null);
        setSecondResultData(secondResult || null);
        
        // Track result view once data is loaded
        if (topResult && !hasTrackedView) {
          gaViewResult({
            topType: parsedResult.topType,
            secondType: parsedResult.secondType,
            results: parsedResult.results.map(({ type, percent }) => ({ type, percent })),
            locale: currentLocale
          });
          setHasTrackedView(true);
        }
      } catch (err) {
        console.error('Error loading result data:', err);
        setError('결과를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    reset();
    router.push('/test');
  };

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy color:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Header Skeleton */}
          <div className="text-center space-y-4">
            <SkeletonCard className="w-20 h-20 rounded-full mx-auto" />
            <SkeletonCard className="h-8 w-64 mx-auto" />
            <SkeletonCard className="h-6 w-48 mx-auto" />
          </div>
          
          {/* Palette Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SkeletonCard className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <SkeletonCard key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>
          
          {/* Results Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <SkeletonCard className="h-6 w-40 mb-4" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} className="h-8" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !result || !uiMessages || !resultData) {
    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800 mb-4">{error || '결과를 표시할 수 없습니다.'}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            테스트 다시하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Result Header */}
      <ResultHeader
        label={resultData.label}
        description={resultData.description}
        percent={result.results[0].percent}
        colors={resultData.colors}
        className="mb-12"
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top 1 Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {uiMessages.yourColorPalette}
            </h3>
            <PaletteGrid colors={resultData.colors} onColorClick={handleCopy} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              {uiMessages.copyColorCode}
            </p>
          </div>

          {/* Top 2 Comparison */}
          {secondResultData && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                {uiMessages.secondBestMatch}: {secondResultData.label}
                <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 text-blue-800 text-xs px-2 py-0.5">
                  {uiMessages.matchRate}
                </span>
              </h3>
              <p className="text-gray-600 mb-4">
                {secondResultData.description}
              </p>
              <PaletteGrid colors={secondResultData.colors.slice(0, 4)} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Percent Bars */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {uiMessages.detailedAnalysis}
            </h3>
            <PercentBars results={result.results} locale={locale} />
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {uiMessages.nextSteps}
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full px-4 py-3 text-white rounded-lg hover:brightness-95 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:ring-offset-2"
                style={{ backgroundColor: '#3B82F6' }}
                aria-label="테스트 다시하기"
              >
                {uiMessages.retakeTest}
              </button>
              
              <ShareButton
                result={{
                  topType: resultData.label,
                  percent: result.results[0].percent
                }}
                uiMessages={uiMessages}
                className="w-full"
              />
              
              <Link
                href="/"
                className="block w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-center focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                {uiMessages.backHome}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">👗</span>
            {uiMessages.stylingTips}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• {uiMessages.stylingTip1}</li>
            <li>• {uiMessages.stylingTip2}</li>
            <li>• {uiMessages.stylingTip3}</li>
            <li>• {uiMessages.stylingTip4}</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <span className="text-2xl mr-2">💡</span>
            {uiMessages.usageGuide}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• {uiMessages.usage1}</li>
            <li>• {uiMessages.usage2}</li>
            <li>• {uiMessages.usage3}</li>
            <li>• {uiMessages.usage4}</li>
          </ul>
        </div>
      </div>

      {/* Ad Slot */}
      <AdSlot label={uiMessages.adPlaceholder || '스폰서 영역'} className="my-8" />
      
      {/* Disclaimer */}
      <div className="text-center text-gray-500 text-sm bg-gray-50 rounded-lg p-4">
        <p>
          {uiMessages.disclaimer}
        </p>
      </div>
      
      {/* Toast */}
      <Toast message={uiMessages.copied || '복사됨'} show={copied} />
      
      {/* Toast Portal for Route Guard */}
      <ToastPortal 
        message={toastMessage} 
        show={showToast} 
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
