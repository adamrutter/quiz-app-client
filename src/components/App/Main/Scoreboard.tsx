import {
  Badge,
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  useColorModeValue
} from "@chakra-ui/react"
import { FaUserAlt } from "react-icons/fa"
import { UsernameItem } from "./shared/UsernameItem"
import React from "react"
import { Alerts } from "./Scoreboard/Alerts"
import { useScores } from "hooks/useScores"

export interface UserScore {
  name: string
  id: string
  score: string
  answeredCorrectly?: boolean
}

export const Scoreboard = () => {
  const scores = useScores()
  const oddLineColor = useColorModeValue("gray.100", "gray.700")

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
              <ListItem bg={indexIsOdd ? oddLineColor : "none"} px={4} py={2}>
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
