import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue
} from "@chakra-ui/react"
import { FaUserAlt, FaUserTimes } from "react-icons/fa"
import { IoMdExit } from "react-icons/io"
import { LeavePartyButton } from "./PartyMembers/LeavePartyButton"
import { Party } from "contexts/PartyContext"
import { PartyLeader } from "contexts/PartyLeaderContext"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import React, { useContext, useEffect, useState } from "react"

interface PartyMember {
  displayName: string
}

export const PartyMembers = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const isPartyLeader = useContext(PartyLeader)

  const [partyMembers, setPartyMembers] = useState<Array<PartyMember>>([])

  useEffect(() => {
    socket.emit("request-party-members")
    socket.on("party-members", (members: Array<PartyMember>) => {
      setPartyMembers(members)
    })
  }, [socket])

  const kickMember = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket.emit(
      "kick-party-member",
      e.currentTarget.getAttribute("data-user-id"),
      partyId
    )
  }

  const userHighlightIconColor = useColorModeValue("brand.400", "brand.300")

  return (
    <Box my={6}>
      <Heading mb={2} size="md" textAlign="left">
        Party
      </Heading>
      <List textAlign="left">
        {Object.entries(partyMembers).map(([id, name], index) => {
          const thisUser = id === userId
          return (
            <ListItem id={`user-${id}`} key={index}>
              <Flex align="center" justify="space-between">
                <Flex align="baseline">
                  <ListIcon
                    alignSelf="center"
                    as={FaUserAlt}
                    color={thisUser ? userHighlightIconColor : "gray.500"}
                    verticalAlign="sub"
                  />
                  {name}
                  <Text as="span" color="gray.500" fontSize="xs" ml={1}>
                    {thisUser && " (you) "}
                  </Text>
                </Flex>
                {isPartyLeader && !thisUser && (
                  <LeavePartyButton
                    icon={<FaUserTimes />}
                    id={id}
                    onClick={kickMember}
                  >
                    Kick
                  </LeavePartyButton>
                )}
                {!isPartyLeader && thisUser && (
                  <LeavePartyButton
                    icon={<IoMdExit />}
                    id={id}
                    onClick={kickMember}
                  >
                    Leave
                  </LeavePartyButton>
                )}
              </Flex>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
