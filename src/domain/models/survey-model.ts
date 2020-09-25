export type SurveyModel = {
  id: string
  question: string
  answers: Answer[]
  date: Date
  didAnswer: boolean
}

type Answer = {
  image?: string
  answer: string
}
