import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export interface User {
  name: string
  id: string
  leader: boolean
}

export const usePartyMembers = () => {
  const socket = useContext(SocketIO)
  const [members, setMembers] = useState<User[]>([])

  useEffect(() => {
    socket.emit("request-party-members")

    const partyMembersListener = (users: User[]) => {
      setMembers(users)
    }

    socket.on("party-members", partyMembersListener)

    return () => {
      socket.off("party-members", partyMembersListener)
    }
  }, [])

  return members
}
