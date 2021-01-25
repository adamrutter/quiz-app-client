import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect } from "react"
import { useToast } from "@chakra-ui/react"

export const Errors = () => {
  const socket = useContext(SocketIO)
  const toast = useToast()

  useEffect(() => {
    const listener = (error: string) => {
      toast({
        description: error,
        position: "bottom-right",
        status: "error",
        isClosable: true
      })
    }

    socket.on("error", listener)

    return () => {
      socket.off("error", listener)
    }
  })

  return null
}
