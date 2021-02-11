import { Button } from "@chakra-ui/react"
import React from "react"

interface Props {
  answer: string
  answerIndex: number
  colorScheme: string
  disabled: boolean
  onClick: (answerIndex: number) => void
  selected: boolean
}

export const Answer = (props: Props) => {
  return (
    <Button
      colorScheme={props.colorScheme}
      disabled={props.disabled}
      height="unset"
      onClick={() => props.onClick(props.answerIndex)}
      py={3}
      whiteSpace="break-spaces"
    >
      {props.answer}
    </Button>
  )
}
