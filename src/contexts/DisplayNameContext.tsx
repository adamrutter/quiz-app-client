import { useCookies } from "react-cookie"
import { SocketIO } from "./SocketIOContext"
import React, { createContext, ReactNode, useContext, useEffect } from "react"

interface Props {
  children?: ReactNode
}

export const DisplayName = createContext("")

export const DisplayNameProvider = (props: Props) => {
  const [cookies, setCookie] = useCookies(["display-name"])
  const socket = useContext(SocketIO)

  useEffect(() => {
    const listener = (name: string) => {
      setCookie("display-name", name, { sameSite: "strict" })
    }

    socket.on("display-name", listener)

    return () => {
      socket.off("display-name", listener)
    }
  }, [cookies, setCookie, socket])

  return (
    <DisplayName.Provider value={cookies["display-name"]}>
      {props.children}
    </DisplayName.Provider>
  )
}
