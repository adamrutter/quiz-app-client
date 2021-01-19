import { Box, Button, Wrap, WrapItem } from "@chakra-ui/react"
import { SocketIO } from "contexts/SocketIOContext"
import { useCookies } from "react-cookie"
import React, { useContext } from "react"
import { User } from "contexts/UserContext"
import { Party } from "contexts/PartyContext"

export const CreateNewParty = () => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)

  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    socket.emit("kick-party-member", userId, partyId)
    removeCookie("display-name")
    removeCookie("user-id")
    removeCookie("party-id")
    removeCookie("quiz-id")
  }

  return (
    <Wrap align="center" justify="space-between" my={7} spacing={4}>
      <WrapItem display="block">
        <Box align="left">Create new party</Box>
        <Box align="left" color="gray.500" fontSize="xs">
          Create a new party, leaving your current one in the process
        </Box>
      </WrapItem>
      <WrapItem>
        <Button colorScheme="red" onClick={onClickButton} variant="outline">
          New party
        </Button>
      </WrapItem>
    </Wrap>
  )
}
