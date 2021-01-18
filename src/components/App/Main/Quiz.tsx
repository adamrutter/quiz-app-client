import { Box, Spinner } from "@chakra-ui/react"
import { Game } from "./Quiz/Game"
import { OptionsForm } from "./Quiz/OptionsForm"
import { Quiz as QuizId } from "contexts/QuizContext"
import { ReadyPrompt } from "./Quiz/ReadyPrompt"
import { SocketIO } from "contexts/SocketIOContext"
import { usePartyLeader } from "hooks/usePartyLeader"
import { User } from "contexts/UserContext"
import { WaitForStart } from "./Quiz/WaitForStart"
import React, { useContext, useEffect, useState } from "react"

export const Quiz = () => {
  const socket = useContext(SocketIO)
  const quizId = useContext(QuizId)
  const userId = useContext(User)
  const partyLeader = usePartyLeader()

  // Whether to show the pre-quiz ready prompt
  const [readyPromptOpen, setReadyPromptOpen] = useState(false)
  useEffect(() => {
    const readyPromptListener = () => setReadyPromptOpen(true)
    const allUsersReadyListener = () => setReadyPromptOpen(false)

    socket.on("ready-prompt", readyPromptListener)
    socket.on("all-users-ready", allUsersReadyListener)

    return () => {
      socket.off("ready-prompt", readyPromptListener)
      socket.off("all-users-ready", allUsersReadyListener)
    }
  }, [])

  return (
    <>
      <ReadyPrompt isOpen={readyPromptOpen} />
      {partyLeader ? (
        userId === partyLeader?.id ? (
          <OptionsForm />
        ) : (
          <WaitForStart />
        )
      ) : (
        <Box>
          Loading... <Spinner ml={2} size="sm" speed="1s" />
        </Box>
      )}
      {quizId && <Game />}
    </>
  )
}
