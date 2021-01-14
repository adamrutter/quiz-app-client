import {
  Alert,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Flex,
  Heading,
  List,
  ListItem
} from "@chakra-ui/react"
import { FaUserAlt } from "react-icons/fa"
import { GiQueenCrown } from "react-icons/gi"
import { SocketIO } from "contexts/SocketIOContext"
import { UsernameItem } from "./shared/UsernameItem"
import { MdGrade } from "react-icons/md"
import React, { useContext, useEffect, useState } from "react"

interface UserScore {
  name: string
  id: string
  score: string
  answeredCorrectly?: boolean
}

// Join an array as it would be written in English
// from https://stackoverflow.com/a/29234240
const joinArray = (arr: string[]) => {
  let outStr = ""
  if (arr.length === 1) {
    outStr = arr[0]
  } else if (arr.length === 2) {
    outStr = arr.join(" and ")
  } else if (arr.length > 2) {
    outStr = arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1)
  }
  return outStr
}

export const Scoreboard = () => {
  const socket = useContext(SocketIO)

  const [scores, setScores] = useState<Array<UserScore>>()
  const [quizFinished, setQuizFinished] = useState(false)

  useEffect(() => {
    const scoreboardListener = (scorecard: Array<UserScore>) => {
      setScores(scorecard)
    }
    const quizWillFinishListener = () => {
      setQuizFinished(true)
    }
    const quizStartListener = () => {
      setQuizFinished(false)
    }

    socket.on("updated-scorecard", scoreboardListener)
    socket.on("quiz-will-end", quizWillFinishListener)
    socket.on("new-quiz-id", quizStartListener)

    return () => {
      socket.off("updated-scorecard", scoreboardListener)
      socket.off("quiz-will-end", quizWillFinishListener)
      socket.off("new-quiz-id", quizStartListener)
    }
  }, [])

  const winningUsers = scores?.filter(user => user.score === scores[0].score)
  const joinedWinnersString =
    winningUsers && joinArray(winningUsers.map(user => user.name))

  return (
    <>
      <Heading mb={2} size="lg" textAlign="left">
        Scoreboard
      </Heading>
      <Box my={2}>
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
      </Box>
      <List>
        {scores &&
          scores.map((user, index) => {
            const indexIsOdd = Math.abs(index % 2) === 1
            return (
              <ListItem bg={indexIsOdd ? "gray.100" : "none"} px={4} py={2}>
                <Flex align="center" justify="space-between">
                  <UsernameItem
                    color={index === 0 ? "brand.400" : "gray.500"}
                    fontSize="lg"
                    icon={FaUserAlt}
                    id={user.id}
                    name={user.name}
                  />
                  <Box>
                    <Flex align="center">
                      {user.answeredCorrectly && (
                        <Badge colorScheme="green" mx={5} variant="solid">
                          Correct!
                        </Badge>
                      )}
                      <Box
                        as="span"
                        fontFamily="mono"
                        fontSize="xl"
                        fontWeight="bold"
                      >
                        {user.score}
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </ListItem>
            )
          })}
      </List>
    </>
  )
}
