import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useCorrectAnswer = () => {
  const socket = useContext(SocketIO)

  const [answer, setAnswer] = useState<number | undefined>()

  useEffect(() => {
    const correctAnswerListener = (correctAnswerIndex: string) => {
      setAnswer(parseInt(correctAnswerIndex))
    }
    const finishQuestionListener = () => {
      setAnswer(undefined)
    }

    socket.on("correct-answer", correctAnswerListener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off("correct-answer", correctAnswerListener)
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return answer
}
