import { Answer } from "./Game/Answer"
import { CollapsibleAlert } from "components/App/shared/CollapsibleAlert"
import { decode } from "he"
import { Header } from "./Game/Header"
import {
  Badge,
  Box,
  Center,
  SimpleGrid,
  Spinner,
  useToast
} from "@chakra-ui/react"
import { Party } from "contexts/PartyContext"
import { Question, User as UserType } from "types"
import { Quiz } from "contexts/QuizContext"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import { UserAnsweredNotification } from "./Game/UserAnsweredNotification"
import { useAnswers } from "hooks/useAnswers"
import { useCorrectAnswer } from "hooks/useCorrectAnswer"
import { usePartyMembers } from "hooks/usePartyMembers"
import { useQuestion } from "hooks/useQuestion"
import { useQuestionTimeLimit } from "hooks/useQuestionTimeLimit"
import { useRemainingAnswersAlert } from "hooks/useRemainingAnswersAlert"
import { useTimer } from "hooks/useTimer"
import { useUsersAnswered } from "hooks/useUsersAnswered"
import React, { useContext, useEffect, useState } from "react"

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
  timer: number | undefined
): boolean => {
  const answerHasBeenSelected = selectedAnswer !== undefined
  const isSelectedAnswer = index === selectedAnswer
  const isCorrectAnswer = index === correctAnswer
  const timerExpired = timer === 0

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

/**
 * Return a color for the given question's difficulty rating
 * @param question
 */
const difficultyColor = (question: Question) => {
  if (question.difficulty === "easy") return "green"
  if (question.difficulty === "medium") return "orange"
  if (question.difficulty === "hard") return "red"
  return "brand"
}

/**
 * Return a color depending on answer state
 * @param thisAnswer
 * @param selectedAnswer
 * @param correctAnswer
 */
const buttonColorScheme = (
  thisAnswer: number,
  selectedAnswer: number | undefined,
  correctAnswer: number | undefined
): string => {
  const isSelectedAnswer = thisAnswer === selectedAnswer
  const answerIsCorrect = thisAnswer === correctAnswer
  const answerIsIncorrect =
    correctAnswer !== undefined && correctAnswer !== thisAnswer

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

export const Game = () => {
  const toast = useToast()

  const socket = useContext(SocketIO)
  const partyId = useContext(Party)
  const userId = useContext(User)
  const quizId = useContext(Quiz)
  const partyMembers = usePartyMembers(partyId)

  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>()

  const currentQuestion = useQuestion()
  const currentAnswers = useAnswers()
  const correctAnswer = useCorrectAnswer()
  const timer = useTimer(currentQuestion?.number)
  const usersAnswered = useUsersAnswered()
  const timeLimit = useQuestionTimeLimit()

  const amountOfMembers = partyMembers.length
  const usersNotAnswered = amountOfMembers - usersAnswered?.length
  const showRemainingAnswersAlert = useRemainingAnswersAlert(
    usersAnswered,
    amountOfMembers,
    userId,
    timer
  )

  // Handle an answer being chosen by the user
  const handleAnswer = (answerIndex: number) => {
    const isNoPreviouslySelectedAnswer = selectedAnswer === undefined
    const timerExpired = timer === 0

    if (isNoPreviouslySelectedAnswer && !timerExpired) {
      setSelectedAnswer(answerIndex)
    }
  }

  useEffect(() => {
    const isSelectedAnswer = selectedAnswer !== undefined
    if (isSelectedAnswer) {
      socket.emit(
        `answer-${quizId}-${currentQuestion?.number}`,
        // @ts-ignore
        currentAnswers[selectedAnswer],
        partyId,
        userId,
        quizId
      )
    }
  }, [
    currentAnswers,
    currentQuestion?.number,
    partyId,
    quizId,
    selectedAnswer,
    socket,
    userId
  ])

  // Handle the end of the current question
  useEffect(() => {
    const listener = () => {
      setSelectedAnswer(undefined)
    }

    socket.on("finish-question", listener)

    return () => {
      socket.off("finish-question", listener)
    }
  }, [socket])

  // Handle being told a user has answered
  useEffect(() => {
    const listener = (thisUser: UserType, totalUsers: string) => {
      // Send a notification if the user answering wasn't this user
      if (thisUser.id !== userId) {
        toast({
          duration: 1000,
          position: "bottom-right",
          render: () => <UserAnsweredNotification user={thisUser.name} />
        })
      }
    }

    socket.on("user-answered", listener)

    return () => {
      socket.off("user-answered", listener)
    }
  }, [socket, toast, userId])

  return (
    <>
      {currentQuestion && (
        <>
          {partyMembers?.length > 1 && (
            <CollapsibleAlert
              colorScheme="brand"
              isOpen={showRemainingAnswersAlert}
              mb={6}
            >
              <Spinner mr={2} size="sm" speed="1.5s" />
              Waiting for{" "}
              {usersNotAnswered === 1
                ? "1 more person"
                : `${usersNotAnswered} more people`}{" "}
              to answer...
            </CollapsibleAlert>
          )}
          <Header
            amountOfQuestions={currentQuestion.total}
            currentQuestionNumber={currentQuestion.number}
            time={timer}
            timeLimit={timeLimit}
          />
          <Box my={7}>
            <Center>
              <Box fontWeight="bold">{currentQuestion?.category}</Box>
              <Badge colorScheme={difficultyColor(currentQuestion)} ml={2}>
                {currentQuestion?.difficulty}
              </Badge>
            </Center>
            <Box fontSize="xl" my={5}>
              {decode(currentQuestion?.question)}
            </Box>
            <SimpleGrid columns={[1]} my={7} spacing={2}>
              {currentAnswers?.map((answer, index) => {
                return (
                  <Answer
                    answer={decode(answer)}
                    colorScheme={buttonColorScheme(
                      index,
                      selectedAnswer,
                      correctAnswer
                    )}
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
          </Box>
        </>
      )}
    </>
  )
}
