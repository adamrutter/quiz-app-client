import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"
import { User } from "types"

export const useRemainingAnswersAlert = (
  usersAnswered: User[],
  amountOfMembers: number,
  selectedAnswer: number | undefined,
  time: number | undefined
) => {
  const socket = useContext(SocketIO)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Open/close alert on number of users answered/whether this user has
    // answered
    const notAllUsersHaveAnswered = usersAnswered?.length < amountOfMembers
    const thisUserHasAnswered = selectedAnswer !== undefined

    if (notAllUsersHaveAnswered && thisUserHasAnswered) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }

    // Close alert when timer reaches zero
    if (time === undefined || time === 0) setShowAlert(false)

    // Close alert at end of question
    const endOfQuestion = () => setShowAlert(false)
    socket.on("finish-question", endOfQuestion)

    return () => {
      socket.off("finish-question", endOfQuestion)
    }
  }, [usersAnswered, time])

  return showAlert
}
