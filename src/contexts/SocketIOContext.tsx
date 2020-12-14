import { Manager } from "socket.io-client"
import React, { createContext, ReactNode } from "react"

interface Props {
  children?: ReactNode
}

const manager = new Manager(process.env.REACT_APP_SERVER_URL)
const socket = manager.socket("/")

export const SocketIO = createContext(socket)

export const SocketIOProvider = (props: Props) => {
  return <SocketIO.Provider value={socket}>{props.children}</SocketIO.Provider>
}
