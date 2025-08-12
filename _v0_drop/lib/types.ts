export interface Question {
  id: number
  text: Record<string, string>
  choices: Choice[]
  tip?: Record<string, string>
}

export interface Choice {
  id: number
  text: Record<string, string>
  palette?: string[]
  image?: string
  weights: Record<string, number>
}

export interface Answer {
  questionId: number
  choiceId: number
}

export interface ColorType {
  id: string
  name: Record<string, string>
  description: Record<string, string>
  palette: string[]
  characteristics: Record<string, string[]>
}
