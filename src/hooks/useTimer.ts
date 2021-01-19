import { Quiz } from "contexts/QuizContext"
import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useTimer = (questionNumber: string | undefined) => {
  const socket = useContext(SocketIO)
  const quizId = useContext(Quiz)

  const [timerValue, setTimerValue] = useState(0)

  const timerEvent = `timer-update-${quizId}-${questionNumber}`

  useEffect(() => {
    const listener = (time: string) => {
      setTimerValue(parseInt(time))
    }
    socket.on(timerEvent, listener)
    return () => {
      socket.off(timerEvent, listener)
    }
  }, [questionNumber])

  return timerValue
}
