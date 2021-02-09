import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useAmountOfQuestions = () => {
  const socket = useContext(SocketIO)

  const [amountOfQuestions, setAmountOfQuestions] = useState("")

  useEffect(() => {
    const listener = (amount: string) => setAmountOfQuestions(amount)
    socket.on("amount-of-questions", listener)
    return () => {
      socket.off("amount-of-questions", listener)
    }
  }, [socket])

  return amountOfQuestions
}
