import {
  AlertIcon,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Wrap,
  WrapItem
} from "@chakra-ui/react"
import { CollapsibleAlert } from "components/App/shared/CollapsibleAlert"
import { DisplayName } from "contexts/DisplayNameContext"
import { FaUserEdit } from "react-icons/fa"
import { Party } from "contexts/PartyContext"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import React, { useContext, useEffect, useState } from "react"

export const ChangeName = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const displayName = useContext(DisplayName)

  const [newDisplayName, setNewDisplayName] = useState(displayName)
  const [formInvalid, setFormInvalid] = useState(false)

  useEffect(() => {
    setNewDisplayName(displayName)
  }, [displayName])

  // Handle the user typing in the input
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value)
    const nameLength = e.target.value.length
    nameLength <= 0 ? setFormInvalid(true) : setFormInvalid(false)
  }

  // Handle the form being submitted
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formInvalid) {
      socket.emit("change-display-name", newDisplayName, userId, partyId)
    }
  }

  return (
    <Box my={6}>
      <Heading mb={2} size="md" textAlign="left">
        Change Name
      </Heading>
      <form onSubmit={submitForm}>
        <Wrap>
          <WrapItem flexGrow={99}>
            <InputGroup>
              <InputLeftAddon>Name</InputLeftAddon>
              <Input
                focusBorderColor="brand.200"
                isInvalid={formInvalid}
                minWidth="0"
                onChange={inputChange}
                placeholder="Display name"
                value={newDisplayName}
              />
            </InputGroup>
          </WrapItem>
          <WrapItem flexGrow={1}>
            <Button
              colorScheme="brand"
              disabled={formInvalid}
              leftIcon={<FaUserEdit />}
              type="submit"
              px={4}
              width="100%"
            >
              Update
            </Button>
          </WrapItem>
        </Wrap>
        <CollapsibleAlert
          isOpen={formInvalid}
          mt={3}
          size="sm"
          status="error"
          variant="left-accent"
        >
          <AlertIcon />
          Please enter a display name
        </CollapsibleAlert>
        <Text align="left" color="gray.500" fontSize="xs" mt={4}>
          How you will appear on the scoreboard and to your friends.
        </Text>
      </form>
    </Box>
  )
}
