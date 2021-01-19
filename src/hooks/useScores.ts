import { SocketIO } from "contexts/SocketIOContext"
import { useContext, useEffect, useState } from "react"

export interface UserScore {
  name: string
  id: string
  score: string
  answeredCorrectly?: boolean
}

export const useScores = () => {
  const socket = useContext(SocketIO)

  const [scores, setScores] = useState<UserScore[]>()

  useEffect(() => {
    const scoreboardListener = (scorecard: Array<UserScore>) => {
      setScores(scorecard)
    }

    socket.on("updated-scorecard", scoreboardListener)

    return () => {
      socket.off("updated-scorecard", scoreboardListener)
    }
  }, [socket])

  return scores
}
