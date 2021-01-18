import { SocketIO } from "./SocketIOContext"
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

export interface User {
  name: string
  id: string
  leader: boolean
}

const initialState: User[] = []

export const PartyMembers = createContext(initialState)

export const PartyMembersProvider = (props: Props) => {
  const socket = useContext(SocketIO)
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    socket.emit("request-party-members")

    const partyMembersListener = (members: User[]) => {
      setUsers(members)
    }

    socket.on("party-members", partyMembersListener)

    return () => {
      socket.off("party-members", partyMembersListener)
    }
  }, [])

  return (
    <PartyMembers.Provider value={users}>
      {props.children}
    </PartyMembers.Provider>
  )
}
