import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

interface Options {
  category: string
  amount: string
  difficulty: string
  type: string
}

export const useChosenOptions = () => {
  const socket = useContext(SocketIO)
  const [options, setOptions] = useState<Options | undefined>()

  useEffect(() => {
    const optionsListener = (options: Options) => setOptions(options)
    socket.on("options-changed", optionsListener)
    return () => {
      socket.off("options-changed", optionsListener)
    }
  }, [socket])

  return options
}
