import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"
import { User as UserType } from "types"

export const useUsersAnswered = () => {
  const socket = useContext(SocketIO)
  const [usersAnswered, setUsersAnswered] = useState<UserType[]>([])

  useEffect(() => {
    const userAnsweredListener = (thisUser: UserType, totalUsers: string) =>
      setUsersAnswered(oldState => [...oldState, thisUser])
    socket.on("user-answered", userAnsweredListener)
    return () => {
      socket.off("user-answered", userAnsweredListener)
    }
  }, [socket])

  useEffect(() => {
    const finishQuestionListener = () => setUsersAnswered([])
    socket.on("finish-question", finishQuestionListener)
    return () => {
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return usersAnswered
}
