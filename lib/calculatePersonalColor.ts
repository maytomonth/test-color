import type { Answer, ScoreMap, PersonalColorResult } from '@/types/quiz';

export function calculatePersonalColor(answers: Answer[], questions: any[]): PersonalColorResult {
  const base: ScoreMap = { spring: 0, summer: 0, fall: 0, winter: 0 };
  const total = answers.length;
  
  answers.forEach((answer, index) => {
    const question = questions.find((q: any) => q.id === answer.questionId);
    if (!question) return;
    
    const choice = question.choices.find((c: any) => c.value === answer.choice);
    if (!choice || !choice.score) return;
    
    // 마지막 문항에 가중치 적용
    const weight = (index === total - 1) ? 1.1 : 1.0;
    
    Object.keys(choice.score).forEach((key: any) => {
      if (key in base) {
        base[key as keyof ScoreMap] += (choice.score[key] || 0) * weight;
      }
    });
  });
  
  // 점수를 배열로 변환하고 정렬
  const scoreArray = Object.entries(base).map(([type, score]) => ({
    type,
    score
  }));
  
  scoreArray.sort((a, b) => b.score - a.score);
  
  // 총합 계산 (0으로 나누기 방지)
  const totalScore = scoreArray.reduce((sum, item) => sum + item.score, 0) || 1;
  
  // 퍼센트 계산
  const resultsWithPercent = scoreArray.map(item => ({
    ...item,
    percent: Math.round((item.score / totalScore) * 100)
  }));
  
  return {
    topType: resultsWithPercent[0].type,
    secondType: resultsWithPercent[1].type,
    results: resultsWithPercent
  };
}
