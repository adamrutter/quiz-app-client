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
import { PartyMembers as PartyMembersContext } from "contexts/PartyMembersContext"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import { UsernameItem } from "../shared/UsernameItem"
import React, { useContext } from "react"

export const PartyMembers = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const isPartyLeader = useContext(PartyLeader)
  const partyMembers = useContext(PartyMembersContext)

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
        {partyMembers.map((member, index) => {
          const thisUser = member.id === userId
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
