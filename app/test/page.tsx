'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { getInitialLocale, loadQuestions, loadUIMessages, type Question, type UIMessages } from '@/lib/i18n';
import { useQuiz } from '@/context/QuizContext';
import { calculatePersonalColor } from '@/lib/calculatePersonalColor';
import { gaAnswerQuestion } from '@/lib/ga-events';
import { QuestionCard } from '@/components/QuestionCard';
import { ChoiceCard } from '@/components/ChoiceCard';
import { ProgressBar } from '@/components/ProgressBar';
import SkeletonCard from '@/components/SkeletonCard';
import StepSegment from '@/components/StepSegment';

export default function TestPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [uiMessages, setUIMessages] = useState<UIMessages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locale, setLocale] = useState<string>('ko');
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [lastKeyPress, setLastKeyPress] = useState<number>(0);
  
  const { currentIndex, answers, setAnswer, next, prev, getCurrentAnswer } = useQuiz();
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const currentLocale = getInitialLocale();
        setLocale(currentLocale);
        const [questionsData, uiData] = await Promise.all([
          loadQuestions(currentLocale),
          loadUIMessages(currentLocale)
        ]);
        
        setQuestions(questionsData);
        setUIMessages(uiData);
      } catch (err) {
        console.error('Error loading test data:', err);
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChoiceSelect = (value: string) => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentIndex];
      setAnswer(currentQuestion.id, value);
    }
  };

  const handleNext = async () => {
    // 이미 진행 중이거나 질문이 없으면 리턴
    if (isAdvancing || questions.length === 0) return;
    
    const currentQuestion = questions[currentIndex];
    const selectedChoice = getCurrentAnswer(currentQuestion.id);
    
    // 선택된 답이 없으면 리턴
    if (!selectedChoice) return;

    setIsAdvancing(true);

    try {
      // Track the answer selection
      gaAnswerQuestion({
        questionId: currentQuestion.id,
        choice: selectedChoice,
        index: currentIndex,
        locale
      });

      if (currentIndex < questions.length - 1) {
        next(questions.length);
      } else {
        // 마지막 문항 - 결과 계산 및 저장
        const result = calculatePersonalColor(answers, questions);
        sessionStorage.setItem('pctResult', JSON.stringify(result));
        router.push('/result');
      }
    } finally {
      // 짧은 지연 후 상태 리셋 (UI 피드백을 위해)
      setTimeout(() => {
        setIsAdvancing(false);
      }, 300);
    }
  };

  const handlePrev = () => {
    prev();
  };

  // 방향키 내비게이션 (쓰로틀링 적용)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (questions.length === 0 || isAdvancing) return;
      
      const now = Date.now();
      const THROTTLE_DELAY = 300; // 300ms 쓰로틀링
      
      // 마지막 키 입력으로부터 충분한 시간이 지나지 않았으면 무시
      if (now - lastKeyPress < THROTTLE_DELAY) return;
      
      const currentQuestion = questions[currentIndex];
      const selectedChoice = getCurrentAnswer(currentQuestion.id);
      const canNext = !!selectedChoice;
      
      if (e.key === 'ArrowRight' && canNext) {
        setLastKeyPress(now);
        handleNext();
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setLastKeyPress(now);
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, questions, getCurrentAnswer, handleNext, handlePrev]);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="space-y-6">
          {/* Progress Bar Skeleton */}
          <SkeletonCard className="h-4 w-full" />
          
          {/* Question Card Skeleton */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <SkeletonCard className="h-8 w-3/4 mb-6" />
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <SkeletonCard key={i} className="h-24" />
              ))}
            </div>
          </div>
          
          {/* Navigation Skeleton */}
          <div className="flex justify-between items-center">
            <SkeletonCard className="h-12 w-24" />
            <SkeletonCard className="h-12 w-24" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">{error}</p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0 || !uiMessages) {
    return (
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-gray-600">질문을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  const selectedChoice = getCurrentAnswer(currentQuestion.id);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{uiMessages.progress}</span>
          <span className="text-sm font-medium text-gray-700">
            Q{currentIndex + 1}/{totalQuestions}
          </span>
        </div>
        <ProgressBar current={currentIndex} total={totalQuestions} />
      </div>

      {/* Question Card */}
      <QuestionCard text={currentQuestion.text} tip={currentQuestion.tip}>
        <div 
          role="radiogroup" 
          aria-label={currentQuestion.text}
          className="grid md:grid-cols-2 gap-6"
        >
          {currentQuestion.choices.map((choice) => (
            <ChoiceCard
              key={choice.value}
              label={choice.label}
              description={choice.description}
              color={choice.color}
              image={choice.image}
              isSelected={selectedChoice === choice.value}
              onClick={() => handleChoiceSelect(choice.value)}
            />
          ))}
        </div>
      </QuestionCard>

      {/* Navigation */}
      <div className="mt-6 md:mt-8 flex items-center justify-end gap-3">
        <Link
          href="/"
          className="px-6 py-3 text-gray-600 hover:text-gray-900 motion-safe:transition-colors motion-safe:duration-200 font-medium"
        >
          ← {uiMessages.first}
        </Link>
        
        <div className="flex space-x-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-6 py-3 rounded-lg font-medium motion-safe:transition-colors motion-safe:duration-200 min-h-[44px] md:min-h-[48px] ${
              currentIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white hover:brightness-95'
            }`}
          >
            {uiMessages.prev}
          </button>
          <button 
            onClick={handleNext}
            disabled={!selectedChoice || isAdvancing}
            aria-busy={isAdvancing}
            className={`px-6 py-3 rounded-lg font-medium motion-safe:transition-colors motion-safe:duration-200 min-h-[48px] md:min-h-[52px] flex items-center justify-center gap-2 ${
              !selectedChoice || isAdvancing
                ? 'text-white cursor-not-allowed disabled:cursor-not-allowed'
                : 'text-white hover:brightness-95'
            }`}
            style={{ 
              backgroundColor: !selectedChoice || isAdvancing ? '#9CA3AF' : '#3B82F6'
            }}
          >
            {isAdvancing && (
              <svg 
                className="animate-spin h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {currentIndex === questions.length - 1 ? uiMessages?.result : uiMessages?.next}
          </button>
        </div>
      </div>

      {/* Step Segment Progress */}
      <StepSegment total={questions.length} current={currentIndex + 1} />
    </div>
  );
}
