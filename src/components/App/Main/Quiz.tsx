import { Box, Spinner } from "@chakra-ui/react"
import { Game } from "./Quiz/Game"
import { OptionsForm } from "./Quiz/OptionsForm"
import { Party } from "contexts/PartyContext"
import { Quiz as QuizId } from "contexts/QuizContext"
import { ReadyPrompt } from "./Quiz/ReadyPrompt"
import { SocketIO } from "contexts/SocketIOContext"
import { useLoadingState } from "hooks/useLoadingState"
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
  const partyLeader = usePartyLeader(partyMembers)
  const isLoading = useLoadingState()

  const userIsPartyLeader = userId === partyLeader?.id

  const [readyPromptOpen, setReadyPromptOpen] = useState(false)

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
      {!isLoading && userIsPartyLeader && <OptionsForm />}
      {!isLoading && !userIsPartyLeader && !quizId && (
        <WaitForStart partyLeader={partyLeader} />
      )}
      {quizId && <Game />}
    </>
  )
}
