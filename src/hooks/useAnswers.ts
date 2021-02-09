import { Question } from "types"
import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useAnswers = () => {
  const socket = useContext(SocketIO)
  const [currentAnswers, setCurrentAnswers] = useState<Array<string>>()

  useEffect(() => {
    const answersListener = (question: Question) =>
      setCurrentAnswers(question.answers)
    socket.on("new-question", answersListener)
    return () => {
      socket.off("new-question", answersListener)
    }
  }, [socket])

  useEffect(() => {
    const finishQuestionListener = () => setCurrentAnswers([])
    socket.on("finish-question", finishQuestionListener)
    return () => {
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return currentAnswers
}
