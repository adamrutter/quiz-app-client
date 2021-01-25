import { Question } from "types"
import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useQuestionTimeLimit = () => {
  const socket = useContext(SocketIO)

  const [timeLimit, setTimeLimit] = useState<number | undefined>()

  useEffect(() => {
    const newQuestionListener = (question: Question, time: string) => {
      setTimeLimit(parseInt(time))
    }
    const finishQuestionListener = () => {
      setTimeLimit(undefined)
    }

    socket.on("new-question", newQuestionListener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off("new-question", newQuestionListener)
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return timeLimit
}
