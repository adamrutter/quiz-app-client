import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export const useAmountOfQuestions = () => {
  const socket = useContext(SocketIO)

  const [amountOfQuestions, setAmountOfQuestions] = useState<
    number | undefined
  >()

  useEffect(() => {
    const listener = (amount: number) => setAmountOfQuestions(amount)
    socket.on("amount-of-questions", listener)
    return () => {
      socket.off("amount-of-questions", listener)
    }
  }, [socket])

  useEffect(() => {
    const listener = () => setAmountOfQuestions(undefined)
    socket.on("quiz-finished", listener)
    return () => {
      socket.off("quiz-finished", listener)
    }
  }, [socket])

  return amountOfQuestions
}
