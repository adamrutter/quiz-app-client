import { useCookies } from "react-cookie"
import { SocketIO } from "../contexts/SocketIOContext"
import { User } from "./UserContext"
import React, { createContext, ReactNode, useContext } from "react"

interface Props {
  children?: ReactNode
}

export const Party = createContext("")

export const PartyProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["party-id"])
  const userId = useContext(User)
  const socket = useContext(SocketIO)

  if (cookies["party-id"]) {
    socket.emit("join-party", cookies["party-id"], userId)
  } else {
    socket.emit("request-new-party")
    socket.on("new-party-id", (id: string) => {
      setCookie("party-id", id)
    })
  }

  return (
    <Party.Provider value={cookies["party-id"]}>
      {props.children}
    </Party.Provider>
  )
}
