import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useIsQuizRunning = () => {
  const socket = useContext(SocketIO)

  const [status, setStatus] = useState(false)

  useEffect(() => {
    const quizStartListener = () => {
      setStatus(true)
    }
    const quizWillFinishListener = () => {
      setStatus(false)
    }

    socket.on("new-quiz-id", quizStartListener)
    socket.on("quiz-will-end", quizWillFinishListener)

    return () => {
      socket.off("new-quiz-id", quizStartListener)
      socket.off("quiz-will-end", quizWillFinishListener)
    }
  }, [socket])

  return status
}
