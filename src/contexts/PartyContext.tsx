import { SocketIO } from "../contexts/SocketIOContext"
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
  const socket = useContext(SocketIO)
  const [partyId, setPartyId] = useState("")

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

  return <Party.Provider value={partyId}>{props.children}</Party.Provider>
}
