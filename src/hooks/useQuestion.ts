import { SocketIO } from "contexts/SocketIOContext"
import { Question } from "types"
import { useContext, useEffect, useState } from "react"

export const useQuestion = () => {
  const socket = useContext(SocketIO)

  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()

  useEffect(() => {
    const newQuestionListener = (question: Question) => {
      setCurrentQuestion(question)
    }
    const finishQuestionListener = () => {
      setCurrentQuestion(undefined)
    }

    socket.on("new-question", newQuestionListener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off("new-question", newQuestionListener)
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return currentQuestion
}
