'use client';

import { useState } from 'react';
import { gaShareResult } from '@/lib/ga-events';
import { getInitialLocale, type UIMessages } from '@/lib/i18n';

interface ShareButtonProps {
  result: {
    topType: string;
    percent: number;
  };
  uiMessages: UIMessages;
  className?: string;
}

export default function ShareButton({ result, uiMessages, className = '' }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState<string | null>(null);

  const handleShare = async () => {
    if (isSharing) return;
    
    setIsSharing(true);
    
    const shareText = `나의 퍼스널 컬러는 ${result.topType} (${result.percent}%)입니다! 당신도 테스트해보세요.`;
    const shareUrl = window.location.origin;
    
    const locale = getInitialLocale();
    let platform = 'copy-link';
    
    try {
      // navigator.share가 지원되는지 확인
      if (navigator.share) {
        platform = 'web-share';
        await navigator.share({
          title: '퍼스널 컬러 테스트 결과',
          text: shareText,
          url: shareUrl,
        });
        setShareMessage('공유되었습니다!');
      } else {
        // 클립보드에 복사
        const fullText = `${shareText}\n${shareUrl}`;
        await navigator.clipboard.writeText(fullText);
        setShareMessage('링크가 클립보드에 복사되었습니다!');
      }
      
      // Track share event
      gaShareResult({
        platform,
        topType: result.topType,
        locale
      });
      
    } catch (error) {
      console.error('Share failed:', error);
      setShareMessage('공유에 실패했습니다.');
    } finally {
      setIsSharing(false);
      setTimeout(() => setShareMessage(null), 3000);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleShare}
        disabled={isSharing}
        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
          isSharing
            ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg'
        }`}
        aria-label={uiMessages.shareResult}
      >
        {isSharing ? (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-gray-200 border-t-transparent rounded-full animate-spin"></div>
            <span>공유 중...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span>{uiMessages.shareResult}</span>
          </div>
        )}
      </button>
      
      {shareMessage && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap z-10">
          {shareMessage}
        </div>
      )}
    </div>
  );
}
