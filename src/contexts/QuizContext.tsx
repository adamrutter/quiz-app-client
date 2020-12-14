import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext } from "react"

interface Props {
  children?: ReactNode
}

export const Quiz = createContext("")

export const QuizProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["quiz-id"])
  const socket = useContext(SocketIO)

  socket.on("new-quiz-id", (id: string) => {
    setCookie("quiz-id", id)
  })

  return (
    <Quiz.Provider value={cookies["quiz-id"]}>{props.children}</Quiz.Provider>
  )
}
