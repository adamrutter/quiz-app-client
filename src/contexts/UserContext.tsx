import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext } from "react"

interface Props {
  children?: ReactNode
}

export const User = createContext("")

export const UserProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["user-id"])
  const socket = useContext(SocketIO)

  if (!cookies["user-id"]) {
    socket.emit("request-user-id")
    socket.on("new-user-id", (id: string) => {
      setCookie("user-id", id)
    })
  }

  return (
    <User.Provider value={cookies["user-id"]}>{props.children}</User.Provider>
  )
}
