import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"
import { SocketIO } from "contexts/SocketIOContext"
import React, { useContext, useEffect, useState } from "react"
import { GiQueenCrown } from "react-icons/gi"
import { MdGrade } from "react-icons/md"
import { joinArray } from "utils/joinArray"
import { UserScore } from "../Scoreboard"

interface Props {
  scores: Array<UserScore> | undefined
}

export const Alerts = ({ scores }: Props) => {
  const socket = useContext(SocketIO)
  const [quizFinished, setQuizFinished] = useState(false)

  const winningUsers = scores?.filter(user => user.score === scores[0].score)
  const joinedWinnersString =
    winningUsers && joinArray(winningUsers.map(user => user.name))

  // Set up listeners
  useEffect(() => {
    const quizStartListener = () => {
      setQuizFinished(false)
    }
    const quizWillFinishListener = () => {
      setQuizFinished(true)
    }

    socket.on("new-quiz-id", quizStartListener)
    socket.on("quiz-will-end", quizWillFinishListener)

    return () => {
      socket.off("new-quiz-id", quizStartListener)
      socket.off("quiz-will-end", quizWillFinishListener)
    }
  }, [])

  return (
    <>
      {quizFinished && (
        <Alert colorScheme="green" variant="left-accent">
          <AlertIcon as={GiQueenCrown} boxSize="2em" />
          <AlertTitle>Quiz finished!</AlertTitle>
          {winningUsers && winningUsers.length === 1 ? (
            <>{joinedWinnersString} is the winner!</>
          ) : (
            <>{joinedWinnersString} are the winners!</>
          )}
        </Alert>
      )}
      {!scores && (
        <Alert colorScheme="brand" textAlign="left" variant="left-accent">
          <AlertIcon as={MdGrade} boxSize="2em" />
          When you have started a quiz, scores will be displayed here.
        </Alert>
      )}
    </>
  )
}
