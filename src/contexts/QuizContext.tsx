import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext, useEffect } from "react"

interface Props {
  children?: ReactNode
}

export const Quiz = createContext<string | undefined>("")

export const QuizProvider = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["quiz-id"])
  const socket = useContext(SocketIO)

  useEffect(() => {
    const quizIdListener = (id: string) => {
      setCookie("quiz-id", id, { sameSite: "strict" })
    }
    const quizFinishedListener = () => {
      removeCookie("quiz-id")
    }

    socket.on("new-quiz-id", quizIdListener)
    socket.on("quiz-finished", quizFinishedListener)

    return () => {
      socket.off("new-quiz-id", quizIdListener)
      socket.off("quiz-finished", quizFinishedListener)
    }
  }, [cookies, removeCookie, setCookie, socket])

  return (
    <Quiz.Provider value={cookies["quiz-id"]}>{props.children}</Quiz.Provider>
  )
}
