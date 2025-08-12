'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Answer } from '@/types/quiz';

interface QuizState {
  answers: Answer[];
  currentIndex: number;
}

interface QuizActions {
  setAnswer: (questionId: string, choice: string) => void;
  next: (totalQuestions: number) => void;
  prev: () => void;
  reset: () => void;
  getCurrentAnswer: (questionId: string) => string | null;
}

interface QuizContextType extends QuizState, QuizActions {}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export function QuizProvider({ children }: QuizProviderProps) {
  const [state, setState] = useState<QuizState>({
    answers: [],
    currentIndex: 0,
  });

  const setAnswer = (questionId: string, choice: string) => {
    setState(prevState => {
      const existingIndex = prevState.answers.findIndex(
        answer => answer.questionId === questionId
      );

      let newAnswers: Answer[];
      if (existingIndex >= 0) {
        // 기존 답변 교체
        newAnswers = [...prevState.answers];
        newAnswers[existingIndex] = { questionId, choice };
      } else {
        // 새 답변 추가
        newAnswers = [...prevState.answers, { questionId, choice }];
      }

      return {
        ...prevState,
        answers: newAnswers,
      };
    });
  };

  const next = (totalQuestions: number) => {
    setState(prevState => ({
      ...prevState,
      currentIndex: Math.min(prevState.currentIndex + 1, totalQuestions - 1),
    }));
  };

  const prev = () => {
    setState(prevState => ({
      ...prevState,
      currentIndex: Math.max(prevState.currentIndex - 1, 0),
    }));
  };

  const reset = () => {
    setState({
      answers: [],
      currentIndex: 0,
    });
  };

  const getCurrentAnswer = (questionId: string): string | null => {
    const answer = state.answers.find(a => a.questionId === questionId);
    return answer ? answer.choice : null;
  };

  const contextValue: QuizContextType = {
    ...state,
    setAnswer,
    next,
    prev,
    reset,
    getCurrentAnswer,
  };

  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz(): QuizContextType {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}
