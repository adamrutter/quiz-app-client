import { Game } from "./Quiz/Game"
import { OptionsForm } from "./Quiz/OptionsForm"
import { Quiz as QuizId } from "contexts/QuizContext"
import { ReadyPrompt } from "./Quiz/ReadyPrompt"
import { SocketIO } from "contexts/SocketIOContext"
import React, { useContext, useEffect, useState } from "react"

export const Quiz = () => {
  const socket = useContext(SocketIO)
  const quizId = useContext(QuizId)

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
      <OptionsForm />
      {quizId && <Game />}
    </>
  )
}
