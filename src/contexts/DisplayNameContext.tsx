import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext } from "react"

interface Props {
  children?: ReactNode
}

export const DisplayName = createContext("")

export const DisplayNameProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["display-name"])
  const socket = useContext(SocketIO)

  socket.on("display-name", (name: string) => {
    setCookie("display-name", name)
  })

  return (
    <DisplayName.Provider value={cookies["display-name"]}>
      {props.children}
    </DisplayName.Provider>
  )
}
