import { Answer } from "./Game/Answer"
import { Header } from "./Game/Header"
import { SimpleGrid, Text } from "@chakra-ui/react"
import { Party } from "contexts/PartyContext"
import { Quiz } from "contexts/QuizContext"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import React, { useContext, useEffect, useState } from "react"

export interface Question {
  question: string
  answers: Array<string>
  category: string
  difficulty: string
  number: string
  total: string
}

/**
 * Determine whether the button should be disabled.
 * @param index The index of this answer/button from the answers array.
 * @param selectedAnswer The selected answer stored in state.
 * @param correctAnswer The correct answer stored in state.
 * @param timer The timer from the socket.io server.
 */
const isButtonDisabled = (
  index: number,
  selectedAnswer: number | undefined,
  correctAnswer: number | undefined,
  timer: number
): boolean => {
  const answerHasBeenSelected = selectedAnswer !== undefined
  const isSelectedAnswer = index === selectedAnswer
  const isCorrectAnswer = index === correctAnswer
  const timerExpired = timer <= 0

  if (answerHasBeenSelected) {
    if (isSelectedAnswer) {
      return false
    } else if (isCorrectAnswer) {
      return false
    } else {
      return true
    }
  } else if (timerExpired && !isCorrectAnswer) {
    return true
  } else {
    return false
  }
}

export const Game = () => {
  const socket = useContext(SocketIO)
  const partyId = useContext(Party)
  const userId = useContext(User)
  const quizId = useContext(Quiz)

  const [timer, setTimer] = useState(0)
  const [amountOfQuestions, setAmountOfQuestions] = useState("")
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()
  const [currentAnswers, setCurrentAnswers] = useState<Array<string>>()
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()
  const [correctAnswer, setCorrectAnswer] = useState<number | undefined>()

  /* Update the timer */
  const timerEvent = `timer-update-${quizId}-${currentQuestion?.number}`
  useEffect(() => {
    const listener = (time: string) => {
      setTimer(parseInt(time))
    }
    socket.on(timerEvent, listener)
    return () => {
      socket.off(timerEvent, listener)
    }
  }, [socket, timer, currentQuestion])

  // Handle socket.io informing us of the amount of questions in the quiz
  useEffect(() => {
    const listener = (amount: string) => {
      setAmountOfQuestions(amount)
    }
    socket.on("amount-of-questions", listener)
    return () => {
      socket.off("amount-of-questions", listener)
    }
  }, [socket])

  // Handle being sent a question by the socket.io server
  useEffect(() => {
    const listener = (question: Question) => {
      setCurrentQuestion(question)
      setCurrentAnswers(question.answers)
    }
    socket.on("new-question", listener)
    return () => {
      socket.off("new-question", listener)
    }
  }, [socket])

  // Handle an answer being chosen by the user
  const handleAnswer = (answerIndex: number) => {
    const isNoPreviouslySelectedAnswer = selectedAnswer === undefined
    if (isNoPreviouslySelectedAnswer) {
      setSelectedAnswer(answerIndex)
    }
  }

  useEffect(() => {
    const isSelectedAnswer = selectedAnswer !== undefined
    if (isSelectedAnswer) {
      socket.emit(
        "answer",
        // @ts-ignore
        currentAnswers[selectedAnswer],
        partyId,
        userId,
        quizId
      )
    }
  }, [selectedAnswer])

  // Handle correct answer being sent from socket.io server
  useEffect(() => {
    const listener = (correctAnswerIndex: string) => {
      setCorrectAnswer(parseInt(correctAnswerIndex))
    }
    socket.on("correct-answer", listener)
    return () => {
      socket.off("correct-answer", listener)
    }
  }, [currentAnswers, socket])

  // Handle the end of the current question
  useEffect(() => {
    const listener = () => {
      setCurrentQuestion(undefined)
      setCurrentAnswers([])
      setSelectedAnswer(undefined)
      setCorrectAnswer(undefined)
    }
    socket.on("finish-question", listener)
    return () => {
      socket.off("finish-question", listener)
    }
  }, [socket])

  // Return the color scheme the button should use.
  const buttonColorScheme = (index: number): string => {
    const isSelectedAnswer = index === selectedAnswer
    const answerIsCorrect = index === correctAnswer
    const answerIsIncorrect =
      correctAnswer !== undefined && correctAnswer !== index

    if (answerIsCorrect) {
      return "green"
    } else if (isSelectedAnswer && answerIsIncorrect) {
      return "red"
    } else if (isSelectedAnswer) {
      return "brand"
    } else {
      return "gray"
    }
  }

  return (
    <>
      {currentQuestion && (
        <>
          <Header
            amountOfQuestions={amountOfQuestions}
            currentQuestionNumber={currentQuestion.number}
            time={timer}
          />
          <Text fontSize="xl" my={6}>
            {currentQuestion?.question}
          </Text>
          <SimpleGrid columns={[1]} my={6} spacing={2}>
            {currentAnswers?.map((answer, index) => {
              return (
                <Answer
                  answer={answer}
                  colorScheme={buttonColorScheme(index)}
                  disabled={isButtonDisabled(
                    index,
                    selectedAnswer,
                    correctAnswer,
                    timer
                  )}
                  key={index}
                  answerIndex={index}
                  onClick={handleAnswer}
                  selected={index === selectedAnswer ? true : false}
                />
              )
            })}
          </SimpleGrid>
        </>
      )}
    </>
  )
}
