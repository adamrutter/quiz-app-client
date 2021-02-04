import { Question } from "types"
import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useAnswers = () => {
  const socket = useContext(SocketIO)

  const [currentAnswers, setCurrentAnswers] = useState<Array<string>>()

  useEffect(() => {
    const answersListener = (question: Question) => {
      setCurrentAnswers(question.answers)
    }
    const finishQuestionListener = () => {
      setCurrentAnswers([])
    }

    socket.on("new-question", answersListener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off("new-question", answersListener)
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return currentAnswers
}
