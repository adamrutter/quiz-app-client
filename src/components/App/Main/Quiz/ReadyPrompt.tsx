import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Progress,
  Text,
  useDisclosure
} from "@chakra-ui/react"
import { Party } from "contexts/PartyContext"
import { Socket } from "socket.io-client"
import { SocketIO } from "contexts/SocketIOContext"
import { useChosenOptions } from "hooks/useChosenOptions"
import { User as UserId } from "contexts/UserContext"
import React, { useContext, useEffect, useState } from "react"

interface Props {
  isOpen: boolean
}

interface User {
  id: string
}

interface readyData {
  partyId: string
  userId: string
}

// Handle user clicking the 'ready' button
const handleReady = (socket: Socket, data: readyData) => {
  socket.emit("user-ready", data)
}

export const ReadyPrompt = (props: Props) => {
  const { onClose } = useDisclosure()
  const partyId = useContext(Party)
  const socket = useContext(SocketIO)
  const userId = useContext(UserId)

  const [usersReady, setUsersReady] = useState<Array<User>>([])
  const [percentUsersReady, setPercentUsersReady] = useState(0)

  const chosenOptions = useChosenOptions()

  const randomCategory = chosenOptions?.category === "Random"
  const randomDifficulty = chosenOptions?.difficulty === "Random"

  // Handle user ready, waiting for other users to be ready
  useEffect(() => {
    const listener = (users: Array<User>) => setUsersReady(users)
    socket.on("these-users-ready", listener)
    return () => {
      socket.off("these-users-ready", listener)
    }
  }, [])

  useEffect(() => {
    const listener = (percent: number) => setPercentUsersReady(percent)
    socket.on("percent-users-ready", listener)
    return () => {
      socket.off("percent-users-ready", listener)
    }
  }, [])

  useEffect(() => {
    const listener = (percent: number) => {
      setUsersReady([])
      setPercentUsersReady(0)
    }
    socket.on("all-users-ready", listener)
    return () => {
      socket.off("all-users-ready", listener)
    }
  }, [])

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderTopColor="brand.400" borderTopWidth={7} mx={2}>
        <ModalBody>
          <Flex alignItems="center" direction="column" px={0} py={9}>
            {usersReady.length === 0 ? (
              <>
                <Text textAlign="center">
                  {chosenOptions?.amount} questions on{" "}
                  <Text as="span" fontStyle="italic" fontWeight="bold">
                    {randomCategory
                      ? "any subject"
                      : `${chosenOptions?.category}`}
                  </Text>
                  ...
                </Text>
                <Text
                  fontSize="3xl"
                  fontWeight="bold"
                  mb={4}
                  mt={3}
                  textAlign="center"
                >
                  Are you ready?
                </Text>
                <Button
                  colorScheme="brand"
                  fontSize="xl"
                  onClick={() => handleReady(socket, { partyId, userId })}
                  size="lg"
                >
                  Yes!
                </Button>
              </>
            ) : (
              <>
                <Text fontSize="xl">Waiting for other users...</Text>
                <Progress
                  colorScheme="brand"
                  hasStripe
                  isAnimated
                  my={6}
                  value={0 || percentUsersReady}
                  w="full"
                />
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
