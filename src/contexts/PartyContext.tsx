import { useCookies } from "react-cookie"
import { Redirect } from "react-router-dom"
import { SocketIO } from "../contexts/SocketIOContext"
import { User } from "./UserContext"
import queryString from "query-string"
import React, { createContext, ReactNode, useContext, useEffect } from "react"

interface Props {
  children?: ReactNode
}

export const Party = createContext("")

export const PartyProvider = (props: Props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["party-id"])
  const userId = useContext(User)
  const socket = useContext(SocketIO)

  const { join: requestedParty } = queryString.parse(window.location.search)

  useEffect(() => {
    const joinedPartyListener = (id: string) => {
      setCookie("party-id", id, { sameSite: "strict" })
      removeCookie("quiz-id")
    }
    const newPartyListener = (id: string) => {
      setCookie("party-id", id, { sameSite: "strict" })
      removeCookie("quiz-id")
    }
    const userLeavingPartyListener = (userLeavingId: string) => {
      if (userId === userLeavingId) {
        removeCookie("party-id")
        removeCookie("quiz-id")
        window.location.reload()
      }
    }

    if (requestedParty) {
      socket.emit("does-party-exist", requestedParty)
      socket.once("party-exists", (exists: boolean) => {
        if (exists) {
          socket.emit("join-party", requestedParty, userId)
        } else {
          socket.emit("request-new-party")
        }
      })
    } else if (cookies["party-id"]) {
      socket.emit("join-party", cookies["party-id"], userId)
    } else {
      socket.emit("request-new-party")
    }

    socket.on("joined-party-id", joinedPartyListener)
    socket.on("new-party-id", newPartyListener)
    socket.on("user-leaving-party", userLeavingPartyListener)

    return () => {
      socket.off("joined-party-id", joinedPartyListener)
      socket.off("new-party-id", newPartyListener)
      socket.off("user-leaving-party", userLeavingPartyListener)
    }
  }, [cookies, removeCookie, requestedParty, setCookie, socket, userId])

  return (
    <Party.Provider value={cookies["party-id"]}>
      {requestedParty && <Redirect to="/" />}
      {props.children}
    </Party.Provider>
  )
}
