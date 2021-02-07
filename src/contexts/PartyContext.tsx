import { Redirect } from "react-router-dom"
import { SocketIO } from "../contexts/SocketIOContext"
import { User } from "./UserContext"
import queryString from "query-string"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

interface Props {
  children?: ReactNode
}

export const Party = createContext("")

export const PartyProvider = (props: Props) => {
  const userId = useContext(User)
  const socket = useContext(SocketIO)
  const [partyId, setPartyId] = useState("")

  const { join: requestedParty } = queryString.parse(window.location.search)

  useEffect(() => {
    const listener = (id: string) => setPartyId(id)
    socket.on("joined-party-id", listener)
    return () => {
      socket.off("joined-party-id", listener)
    }
  }, [socket])

  useEffect(() => {
    const listener = (id: string) => setPartyId(id)
    socket.on("new-party-id", listener)
    return () => {
      socket.off("new-party-id", listener)
    }
  }, [socket])

  useEffect(() => {
    const listener = (userLeavingId: string) => {
      if (userId === userLeavingId) window.location.reload()
    }
    socket.on("user-leaving-party", listener)
    return () => {
      socket.off("user-leaving-party", listener)
    }
  }, [socket, userId])

  useEffect(() => {
    if (requestedParty && userId) {
      socket.emit("does-party-exist", requestedParty)
      socket.once("party-exists", (exists: boolean) => {
        if (exists) {
          socket.emit("join-party", requestedParty, userId)
        } else {
          socket.emit("request-new-party", userId)
        }
      })
    } else if (!partyId && userId.length > 0) {
      socket.emit("request-new-party", userId)
    }

    return () => {}
  }, [partyId, requestedParty, socket, userId])

  return (
    <Party.Provider value={partyId}>
      {requestedParty && userId && <Redirect to="/" />}
      {props.children}
    </Party.Provider>
  )
}
