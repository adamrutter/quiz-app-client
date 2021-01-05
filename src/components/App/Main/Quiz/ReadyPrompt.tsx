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
  const partyId = useContext(Party)
  const socket = useContext(SocketIO)
  const userId = useContext(UserId)

  // Handle user ready, waiting for other users to be ready
  const [usersReady, setUsersReady] = useState<Array<User>>([])
  const [percentUsersReady, setPercentUsersReady] = useState(0)

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

  const { onClose } = useDisclosure()

  return (
    <Modal isOpen={props.isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Flex alignItems="center" direction="column" px={5} py={9}>
            {usersReady.length === 0 ? (
              <>
                <Text fontSize="2xl" mb={4}>
                  Are you ready...?
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
