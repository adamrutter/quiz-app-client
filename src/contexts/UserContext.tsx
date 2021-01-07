import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext, useEffect } from "react"

interface Props {
  children?: ReactNode
}

export const User = createContext("")

export const UserProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["user-id"])
  const socket = useContext(SocketIO)

  useEffect(() => {
    const listener = (id: string) => {
      setCookie("user-id", id)
    }

    socket.on("new-user-id", listener)

    return () => {
      socket.off("new-user-id", listener)
    }
  }, [cookies])

  if (!cookies["user-id"]) {
    socket.emit("request-user-id")
  }

  return (
    <User.Provider value={cookies["user-id"]}>{props.children}</User.Provider>
  )
}
