import { useCookies } from "react-cookie"
import { SocketIO } from "../contexts/SocketIOContext"
import queryString from "query-string"
import React, { createContext, ReactNode, useContext, useEffect } from "react"

interface Props {
  children?: ReactNode
}

export const PartyLeader = createContext(true)

export const PartyLeaderProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["party-leader"])
  const socket = useContext(SocketIO)

  const { join: requestedParty } = queryString.parse(window.location.search)

  useEffect(() => {
    const newPartyListener = (id: string) => {
      setCookie("party-leader", true)
    }
    const joinedPartyListener = (id: string) => {
      setCookie("party-leader", false)
    }

    socket.on("new-party-id", newPartyListener)
    if (requestedParty) {
      socket.on("joined-party-id", joinedPartyListener)
    }

    return () => {
      socket.off("new-party-id", newPartyListener)
      socket.off("joined-party-id", joinedPartyListener)
    }
  }, [cookies])

  return (
    <PartyLeader.Provider value={cookies["party-leader"] === "true"}>
      {props.children}
    </PartyLeader.Provider>
  )
}
