import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Answer, ColorType } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateResult(answers: Answer[], colorTypes: ColorType[]) {
  const scores: Record<string, number> = {}

  // Initialize scores
  colorTypes.forEach((type) => {
    scores[type.id] = 0
  })

  // Calculate scores based on answers
  answers.forEach((answer) => {
    // This is a simplified calculation - in a real app, you'd have more complex logic
    // based on the question weights and choice weights
    const questionId = answer.questionId
    const choiceId = answer.choiceId

    // Add points based on choice weights (this would come from your question data)
    if (questionId === 0) {
      // Hair color question
      if (choiceId === 0) {
        scores.summer += 3
        scores.winter += 2
        scores.spring += 1
      } else if (choiceId === 1) {
        scores.spring += 3
        scores.autumn += 2
        scores.summer += 1
      } else if (choiceId === 2) {
        scores.autumn += 2
        scores.summer += 2
        scores.spring += 1
        scores.winter += 1
      } else if (choiceId === 3) {
        scores.winter += 3
        scores.autumn += 2
        scores.summer += 1
      }
    }
    // Add similar logic for other questions...
  })

  // Find the highest scoring type
  const topTypeId = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b))
  const topType = colorTypes.find((type) => type.id === topTypeId)!

  // Calculate percentages
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const percentages: Record<string, number> = {}

  Object.keys(scores).forEach((typeId) => {
    percentages[typeId] = totalScore > 0 ? (scores[typeId] / totalScore) * 100 : 0
  })

  return {
    ...topType,
    percentages,
  }
}
