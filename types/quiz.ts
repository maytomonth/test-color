export type Answer = {
  questionId: string;
  choice: string;
};

export type ScoreMap = {
  spring: number;
  summer: number;
  fall: number;
  winter: number;
};

export type PersonalColorResult = {
  topType: string;
  secondType: string;
  results: Array<{
    type: string;
    score: number;
    percent: number;
  }>;
};
