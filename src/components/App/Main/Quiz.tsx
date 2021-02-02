import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react"
import { Game } from "./Quiz/Game"
import { OptionsForm } from "./Quiz/OptionsForm"
import { Party } from "contexts/PartyContext"
import { Quiz as QuizId } from "contexts/QuizContext"
import { ReadyPrompt } from "./Quiz/ReadyPrompt"
import { SocketIO } from "contexts/SocketIOContext"
import { usePartyLeader } from "hooks/usePartyLeader"
import { usePartyMembers } from "hooks/usePartyMembers"
import { User } from "contexts/UserContext"
import { WaitForStart } from "./Quiz/WaitForStart"
import React, { useContext, useEffect, useState } from "react"

export const Quiz = () => {
  const socket = useContext(SocketIO)
  const quizId = useContext(QuizId)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = usePartyLeader(partyId)

  const [readyPromptOpen, setReadyPromptOpen] = useState(false)

  const isLoading = partyMembers.length === 0

  // Whether to show the pre-quiz ready prompt
  useEffect(() => {
    const readyPromptListener = () => setReadyPromptOpen(true)
    const allUsersReadyListener = () => setReadyPromptOpen(false)

    socket.on("ready-prompt", readyPromptListener)
    socket.on("all-users-ready", allUsersReadyListener)

    return () => {
      socket.off("ready-prompt", readyPromptListener)
      socket.off("all-users-ready", allUsersReadyListener)
    }
  }, [socket])

  return (
    <>
      <ReadyPrompt isOpen={readyPromptOpen} />
      {isLoading && (
        <Box>
          Loading... <Spinner ml={2} size="sm" speed="1s" />
        </Box>
      )}
      {!isLoading && partyLeader && userId === partyLeader?.id && (
        <OptionsForm />
      )}
      {!isLoading && partyLeader && userId !== partyLeader?.id && !quizId && (
        <WaitForStart />
      )}
      {!isLoading && !partyLeader && (
        <Alert
          mb={6}
          mt={3}
          status="error"
          textAlign="left"
          variant="left-accent"
        >
          <AlertIcon />
          There is no party leader. Please either create or join another party.
        </Alert>
      )}
      {quizId && <Game />}
    </>
  )
}
