"use client"

import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect } from "react"
import type { Question, Answer } from "@/lib/types"
import { translations } from "@/lib/translations"

interface TestPageProps {
  question: Question
  currentAnswer?: Answer
  onAnswer: (questionId: number, choiceId: number) => void
  onNext: () => void
  onPrevious: () => void
  canProceed: boolean
  canGoBack: boolean
  isLastQuestion: boolean
  locale: string
}

export function TestPage({
  question,
  currentAnswer,
  onAnswer,
  onNext,
  onPrevious,
  canProceed,
  canGoBack,
  isLastQuestion,
  locale,
}: TestPageProps) {
  const t = translations[locale] || translations.en

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && canGoBack) {
        event.preventDefault()
        onPrevious()
      } else if (event.key === "ArrowRight" && canProceed) {
        event.preventDefault()
        onNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [canGoBack, canProceed, onPrevious, onNext])

  return (
    <main className="flex-1 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Question Card */}
        <Card className="rounded-xl bg-white dark:bg-neutral-dark shadow-md p-6 md:p-10 border-0">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 leading-relaxed">
              {question.text[locale] || question.text.en}
            </h2>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-6">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((question.id + 1) / 12) * 100}%` }}
              />
            </div>
          </div>

          {/* Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {question.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onAnswer(question.id, choice.id)}
                className={`
                  group relative rounded-xl shadow-sm border-2 transition-all duration-200 p-4 text-left
                  hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50
                  ${
                    currentAnswer?.choiceId === choice.id
                      ? "border-primary ring-2 ring-primary/30 bg-primary/5"
                      : "border-gray-200 dark:border-gray-600 hover:border-primary bg-white dark:bg-gray-800"
                  }
                `}
              >
                {/* Color Palette Display */}
                {choice.palette && (
                  <div className="flex gap-1 mb-3">
                    {choice.palette.map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                {/* Choice Image */}
                {choice.image && (
                  <div className="mb-3">
                    <img
                      src={choice.image || "/placeholder.svg"}
                      alt={choice.text[locale] || choice.text.en}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Choice Text */}
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {choice.text[locale] || choice.text.en}
                </p>
              </button>
            ))}
          </div>

          {/* Tip Section */}
          {question.tip && (
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-8">
              <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                {question.tip[locale] || question.tip.en}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              onClick={onPrevious}
              disabled={!canGoBack}
              variant="outline"
              className={`
                rounded-full px-6 py-2 font-medium transition-all
                ${
                  canGoBack
                    ? "bg-neutral-light dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                    : "opacity-50 cursor-not-allowed"
                }
              `}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t.previous}
            </Button>

            <Button
              onClick={onNext}
              disabled={!canProceed}
              className={`
                rounded-full px-6 py-2 font-medium transition-all
                ${
                  canProceed
                    ? "bg-primary text-white hover:bg-green-500 shadow-sm"
                    : "opacity-50 cursor-not-allowed bg-primary"
                }
              `}
            >
              {isLastQuestion ? t.finish : t.next}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
