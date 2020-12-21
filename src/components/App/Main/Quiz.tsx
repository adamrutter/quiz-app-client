import { OptionsForm } from "./Quiz/OptionsForm"
import { Quiz as QuizId } from "contexts/QuizContext"
import { ReadyPrompt } from "./Quiz/ReadyPrompt"
import { SocketIO } from "contexts/SocketIOContext"
import React, { useContext, useState } from "react"

export const Quiz = () => {
  const socket = useContext(SocketIO)
  const quizId = useContext(QuizId)

  // Whether to show the pre-quiz ready prompt
  const [readyPromptOpen, setReadyPromptOpen] = useState(false)
  socket.on("ready-prompt", () => setReadyPromptOpen(true))
  socket.on("all-users-ready", () => setReadyPromptOpen(false))

  return (
    <>
      <ReadyPrompt isOpen={readyPromptOpen} />
      {quizId ? <>Quiz</> : <OptionsForm />}
    </>
  )
}
