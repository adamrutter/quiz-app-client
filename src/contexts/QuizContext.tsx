import { SocketIO } from "./SocketIOContext"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

interface Props {
  children?: ReactNode
}

export const Quiz = createContext<string | undefined>("")

export const QuizProvider = (props: Props) => {
  const socket = useContext(SocketIO)
  const [quizId, setQuizId] = useState("")

  useEffect(() => {
    const quizIdListener = (id: string) => setQuizId(id)
    socket.on("new-quiz-id", quizIdListener)
    return () => {
      socket.off("new-quiz-id", quizIdListener)
    }
  }, [socket])

  useEffect(() => {
    const quizFinishedListener = () => setQuizId("")
    socket.on("quiz-finished", quizFinishedListener)
    return () => {
      socket.off("quiz-finished", quizFinishedListener)
    }
  }, [socket])

  return <Quiz.Provider value={quizId}>{props.children}</Quiz.Provider>
}
