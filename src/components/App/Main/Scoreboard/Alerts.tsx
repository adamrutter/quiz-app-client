import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react"
import { useIsQuizRunning } from "hooks/useIsQuizRunning"
import React from "react"
import { GiQueenCrown } from "react-icons/gi"
import { MdGrade } from "react-icons/md"
import { joinArray } from "utils/joinArray"
import { UserScore } from "../Scoreboard"

interface Props {
  scores: Array<UserScore> | undefined
}

export const Alerts = ({ scores }: Props) => {
  const quizRunning = useIsQuizRunning()

  const winningUsers = scores?.filter(user => user.score === scores[0].score)
  const joinedWinnersString =
    winningUsers && joinArray(winningUsers.map(user => user.name))
  const quizFinished = !quizRunning

  return (
    <>
      {quizFinished && winningUsers && (
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
