'use client';

interface QuestionCardProps {
  text: string;
  tip?: string;
  children: React.ReactNode;
}

export function QuestionCard({ text, tip, children }: QuestionCardProps) {
  return (
    <div className="rounded-xl bg-white dark:bg-neutral-900 shadow-md p-6 md:p-10 border-0">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
          {text}
        </h2>
      </div>

      {/* Choices Container */}
      <div className="mb-8">
        {children}
      </div>

      {/* Tip Section */}
      {tip && (
        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-8">
          <span className="text-blue-500 mt-0.5 flex-shrink-0">💡</span>
          <p className="text-sm italic text-gray-600 dark:text-gray-400">
            {tip}
          </p>
        </div>
      )}
    </div>
  );
}
