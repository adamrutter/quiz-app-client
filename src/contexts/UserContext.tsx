import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext, useState } from "react"

interface Props {
  children?: ReactNode
}

export const User = createContext("")

export const UserProvider = (props: Props) => {
  const socket = useContext(SocketIO)
  const [userId, setUserId] = useState("")
  socket.once("connect", () => setUserId(socket.id))

  return <User.Provider value={userId}>{props.children}</User.Provider>
}
