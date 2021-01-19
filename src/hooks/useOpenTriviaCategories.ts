import axios from "axios"
import { useEffect, useState } from "react"

interface TriviaCategory {
  id: number
  name: string
}

const getCategories = async () => {
  try {
    const { data } = await axios.get("https://opentdb.com/api_category.php")
    const categories: Array<TriviaCategory> = data.trivia_categories
    const sortedCategories = categories.sort((a, b) =>
      a.name !== b.name ? (a.name < b.name ? -1 : 1) : 0
    )
    return sortedCategories
  } catch (error) {
    console.error(error)
    return []
  }
}

export const useOpenTriviaCategories = () => {
  const [categories, setCategories] = useState<TriviaCategory[]>()

  useEffect(() => {
    ;(async () => {
      const data = await getCategories()
      setCategories(data)
    })()
  }, [])

  return categories
}
