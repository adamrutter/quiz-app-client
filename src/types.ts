export interface Question {
  question: string
  answers: Array<string>
  category: string
  difficulty: string
  number: string
  total: string
}

export interface User {
  id: string
  name: string
}
