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

export const DisplayName = createContext("")

export const DisplayNameProvider = (props: Props) => {
  const socket = useContext(SocketIO)
  const [displayName, setDisplayName] = useState("")

  useEffect(() => {
    const listener = (name: string) => setDisplayName(name)
    socket.on("display-name", listener)
    return () => {
      socket.off("display-name", listener)
    }
  }, [socket])

  return (
    <DisplayName.Provider value={displayName}>
      {props.children}
    </DisplayName.Provider>
  )
}
