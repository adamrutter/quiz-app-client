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

export const User = createContext("")

export const UserProvider = (props: Props) => {
  const socket = useContext(SocketIO)
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const listener = (id: string) => setUserId(id)
    socket.on("new-user-id", listener)
    return () => {
      socket.off("new-user-id", listener)
    }
  }, [socket])

  if (!userId) {
    socket.emit("request-user-id")
  }

  return <User.Provider value={userId}>{props.children}</User.Provider>
}
