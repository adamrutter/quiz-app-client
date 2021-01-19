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
import { Alerts } from "./Scoreboard/Alerts"

export interface UserScore {
  name: string
  id: string
  score: string
  answeredCorrectly?: boolean
}

export const Scoreboard = () => {
  const socket = useContext(SocketIO)
  const [scores, setScores] = useState<Array<UserScore>>()

  useEffect(() => {
    const scoreboardListener = (scorecard: Array<UserScore>) => {
      setScores(scorecard)
    }
    socket.on("updated-scorecard", scoreboardListener)
    return () => {
      socket.off("updated-scorecard", scoreboardListener)
    }
  }, [])

  return (
    <>
      <Heading mb={2} size="lg" textAlign="left">
        Scoreboard
      </Heading>
      <Box my={2}>
        <Alerts scores={scores} />
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
