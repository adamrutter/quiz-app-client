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
  api: string | number | undefined
  human: string | number
}

export interface Options {
  category: Option
  difficulty: Option
  amount: Option
  type: Option
  time: Option
}

export interface OptionsVariant {
  category: string | number | undefined
  difficulty: string | number | undefined
  amount: string | number | undefined
  type: string | number | undefined
  time: string | number | undefined
}
