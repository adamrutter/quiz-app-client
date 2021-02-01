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

export interface OpenTriviaDBCategory {
  id: number
  name: string
}

export interface OpenTriviaDBOptions {
  category: number | undefined
  amount: string | undefined
  difficulty: string | undefined
  type: string | undefined
}

export interface Option {
  api: string | undefined
  human: string
}

export interface Options {
  category: Option
  difficulty: Option
  amount: Option
  type: Option
  time: Option
}

export interface OptionsVariant {
  category: string | undefined
  difficulty: string | undefined
  amount: string | undefined
  type: string | undefined
  time: string | undefined
}
