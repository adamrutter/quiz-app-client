import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"
import { User as UserType } from "types"

export const useUsersAnswered = () => {
  const socket = useContext(SocketIO)

  const [usersAnswered, setUsersAnswered] = useState<UserType[]>([])

  useEffect(() => {
    const userAnsweredListener = (thisUser: UserType, totalUsers: string) => {
      setUsersAnswered(oldState => [...oldState, thisUser])
    }
    const finishQuestionListener = () => {
      setUsersAnswered([])
    }

    socket.on("user-answered", userAnsweredListener)
    socket.on("finish-question", finishQuestionListener)

    return () => {
      socket.off("user-answered", userAnsweredListener)
      socket.off("finish-question", finishQuestionListener)
    }
  }, [socket])

  return usersAnswered
}
