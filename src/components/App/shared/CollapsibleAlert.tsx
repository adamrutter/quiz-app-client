import { Alert, AlertProps, Collapse } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props extends AlertProps {
  children?: ReactNode
  isOpen: boolean
}

export const CollapsibleAlert = ({ children, isOpen, ...rest }: Props) => {
  return (
    <Collapse in={isOpen}>
      <Alert {...rest}>{children}</Alert>
    </Collapse>
  )
}
