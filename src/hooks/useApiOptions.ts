import { OpenTriviaDBCategory, OpenTriviaDBOptions } from "types"
import { ReactText, useEffect, useState } from "react"
import { useOpenTriviaCategories } from "./useOpenTriviaCategories"

const processType = (type: ReactText) => {
  let str
  if (type === "Random") str = undefined
  if (type === "Multiple choice") str = "multiple"
  if (type === "True/false") str = "boolean"
  return str
}

const processDifficulty = (difficulty: ReactText) => {
  const str =
    difficulty === "Random" ? undefined : difficulty.toString().toLowerCase()
  return str
}

const processCategory = (
  formValue: string,
  categories: OpenTriviaDBCategory[]
) => {
  const obj = categories?.find(category => category.name === formValue)
  return obj?.id
}

export const useApiOptions = (
  categoryFormValue: string,
  difficultyFormValue: ReactText,
  typeFormValue: ReactText,
  amountFormValue: string
): OpenTriviaDBOptions => {
  const [categoryId, setCategoryId] = useState<number | undefined>()
  const [difficulty, setDifficulty] = useState<string | undefined>()
  const [type, setType] = useState<string | undefined>()
  const [amount, setAmount] = useState<string | undefined>()

  const categories = useOpenTriviaCategories()

  useEffect(() => {
    categories && setCategoryId(processCategory(categoryFormValue, categories))
    setDifficulty(processDifficulty(difficultyFormValue))
    setType(processType(typeFormValue))
    setAmount(amountFormValue)
  }, [categoryFormValue, difficultyFormValue, typeFormValue, amountFormValue])

  return {
    category: categoryId,
    amount,
    difficulty,
    type
  }
}
