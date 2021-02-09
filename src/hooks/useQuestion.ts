import { SocketIO } from "contexts/SocketIOContext"
import { Question } from "types"
import { useContext, useEffect, useState } from "react"

export const useQuestion = () => {
  const socket = useContext(SocketIO)
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()

  useEffect(() => {
    const newQuestionListener = (question: Question) =>
      setCurrentQuestion(question)
    socket.on("new-question", newQuestionListener)
    return () => {
      socket.off("new-question", newQuestionListener)
    }
  }, [socket])

  useEffect(() => {
    const finishQuestionListener = () => setCurrentQuestion(undefined)
    socket.on("finish-question", finishQuestionListener)
    return () => {
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return currentQuestion
}
