import { Button } from "@chakra-ui/react"
import React, { ReactElement, ReactNode } from "react"

interface Props {
  children: ReactNode
  icon: ReactElement
  id: string
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const LeavePartyButton = (props: Props) => {
  return (
    <Button
      colorScheme="red"
      data-user-id={props.id}
      leftIcon={props.icon}
      onClick={props.onClick}
      size="sm"
      variant="ghost"
    >
      {props.children}
    </Button>
  )
}
