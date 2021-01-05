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
      onClick={() => props.onClick(props.answerIndex)}
    >
      {props.answer}
    </Button>
  )
}
