import { event } from '@/lib/ga';

export function gaStartTest(payload: { locale: string }) {
  event('start_test', payload);
}

export function gaAnswerQuestion(payload: { 
  questionId: string; 
  choice: string; 
  index: number; 
  locale: string 
}) {
  event('answer_question', payload);
}

export function gaViewResult(payload: {
  topType: string; 
  secondType: string; 
  results: Array<{ type: string; percent: number }>; 
  locale: string;
}) {
  event('view_result', payload);
}

export function gaShareResult(payload: { 
  platform: string; 
  topType?: string; 
  locale: string 
}) {
  event('share_result', payload);
}
