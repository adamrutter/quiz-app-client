import { useCookies } from "react-cookie"
import { SocketIO } from "../contexts/SocketIOContext"
import queryString from "query-string"
import React, { createContext, ReactNode, useContext } from "react"

interface Props {
  children?: ReactNode
}

export const PartyLeader = createContext(false)

export const PartyLeaderProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["party-leader"])
  const socket = useContext(SocketIO)

  const { join: requestedParty } = queryString.parse(window.location.search)

  if (requestedParty) {
    socket.on("joined-party-id", (id: string) => {
      setCookie("party-leader", false)
    })
  } else if (!cookies["party-id"]) {
    socket.on("new-party-id", (id: string) => {
      setCookie("party-leader", true)
    })
  }

  return (
    <PartyLeader.Provider value={cookies["party-leader"] === "true"}>
      {props.children}
    </PartyLeader.Provider>
  )
}
