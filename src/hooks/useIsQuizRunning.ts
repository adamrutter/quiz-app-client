import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useIsQuizRunning = () => {
  const socket = useContext(SocketIO)
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const quizStartListener = () => setStatus(true)
    socket.on("new-quiz-id", quizStartListener)
    return () => {
      socket.off("new-quiz-id", quizStartListener)
    }
  }, [socket])

  useEffect(() => {
    const quizWillFinishListener = () => setStatus(false)
    socket.on("quiz-will-end", quizWillFinishListener)
    return () => {
      socket.off("quiz-will-end", quizWillFinishListener)
    }
  }, [socket])

  return status
}
