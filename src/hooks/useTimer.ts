import { Quiz } from "contexts/QuizContext"
import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useTimer = (questionNumber: string | undefined) => {
  const socket = useContext(SocketIO)
  const quizId = useContext(Quiz)

  const [timerValue, setTimerValue] = useState<number | undefined>()

  const timerEvent = `timer-update-${quizId}-${questionNumber}`

  useEffect(() => {
    const listener = (time: string) => {
      setTimerValue(parseInt(time))
    }
    const finishQuestionListener = () => {
      setTimerValue(undefined)
    }

    socket.on(timerEvent, listener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off(timerEvent, listener)
      socket.on("finish-question", finishQuestionListener)
    }
  }, [questionNumber])

  return timerValue
}
