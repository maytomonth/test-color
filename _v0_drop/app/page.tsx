"use client"

import { useState } from "react"
import { TestPage } from "@/components/test-page"
import { ResultPage } from "@/components/result-page"
import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { questions, colorTypes } from "@/lib/data"
import { calculateResult } from "@/lib/utils"
import type { Answer, ColorType } from "@/lib/types"

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [result, setResult] = useState<ColorType | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [locale, setLocale] = useState("en")

  const handleAnswer = (questionId: number, choiceId: number) => {
    const newAnswers = [...answers]
    const existingIndex = newAnswers.findIndex((a) => a.questionId === questionId)

    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId, choiceId }
    } else {
      newAnswers.push({ questionId, choiceId })
    }

    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      const calculatedResult = calculateResult(answers, colorTypes)
      setResult(calculatedResult)
      setShowResult(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
    setShowResult(false)
  }

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion)
  const canProceed = currentAnswer !== undefined

  if (showResult && result) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Color Test</h1>
            <div className="flex items-center gap-4">
              <LanguageSelector locale={locale} onLocaleChange={setLocale} />
              <ThemeToggle />
            </div>
          </div>
        </header>
        <ResultPage result={result} colorTypes={colorTypes} onRetry={handleRetry} locale={locale} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Color Test</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {currentQuestion + 1} / {questions.length}
            </div>
            <LanguageSelector locale={locale} onLocaleChange={setLocale} />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <TestPage
        question={questions[currentQuestion]}
        currentAnswer={currentAnswer}
        onAnswer={handleAnswer}
        onNext={handleNext}
        onPrevious={handlePrevious}
        canProceed={canProceed}
        canGoBack={currentQuestion > 0}
        isLastQuestion={currentQuestion === questions.length - 1}
        locale={locale}
      />
    </div>
  )
}
