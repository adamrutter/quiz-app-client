import { Box, Heading, List, ListIcon, ListItem, Text } from "@chakra-ui/react"
import { FaUserAlt } from "react-icons/fa"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import React, { useContext, useEffect, useState } from "react"

interface PartyMember {
  displayName: string
}

export const PartyMembers = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)

  const [partyMembers, setPartyMembers] = useState<Array<PartyMember>>([])

  useEffect(() => {
    socket.emit("request-party-members")
    socket.on("party-members", (members: Array<PartyMember>) => {
      setPartyMembers(members)
    })
  }, [socket])

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
              <ListIcon as={FaUserAlt} color="gray.500" verticalAlign="sub" />
              {name}
              <Text as="span" color="gray.500" fontSize="xs">
                {thisUser && " (you) "}
              </Text>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}
