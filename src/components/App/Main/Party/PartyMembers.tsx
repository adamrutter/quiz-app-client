import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  useColorModeValue
} from "@chakra-ui/react"
import { FaUserAlt, FaUserTimes } from "react-icons/fa"
import { IoMdExit } from "react-icons/io"
import { LeavePartyButton } from "./PartyMembers/LeavePartyButton"
import { Party } from "contexts/PartyContext"
import { SocketIO } from "contexts/SocketIOContext"
import { usePartyLeader } from "hooks/usePartyLeader"
import { usePartyMembers } from "hooks/usePartyMembers"
import { User } from "contexts/UserContext"
import { UsernameItem } from "../shared/UsernameItem"
import React, { useContext } from "react"

export const PartyMembers = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = usePartyLeader(partyMembers)

  const kickMember = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket.emit(
      "kick-party-member",
      e.currentTarget.getAttribute("data-user-id"),
      partyId
    )
  }

  const userHighlightIconColor = useColorModeValue("brand.400", "brand.300")

  return (
    <Box my={3}>
      <Heading mb={2} size="md" textAlign="left">
        Party
      </Heading>
      <List textAlign="left">
        {partyMembers.map((member, index) => {
          const thisUser = member.id === userId
          const isPartyLeader = partyLeader?.id === userId

          return (
            <ListItem id={`user-${member.id}`} key={index}>
              <Flex align="center" justify="space-between">
                <UsernameItem
                  color={thisUser ? userHighlightIconColor : undefined}
                  icon={FaUserAlt}
                  id={member.id}
                  name={member.name}
                />
                {isPartyLeader && !thisUser && (
                  <LeavePartyButton
                    icon={<FaUserTimes />}
                    id={member.id}
                    onClick={kickMember}
                  >
                    Kick
                  </LeavePartyButton>
                )}
                {!isPartyLeader && thisUser && (
                  <LeavePartyButton
                    icon={<IoMdExit />}
                    id={member.id}
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
