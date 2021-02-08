import { ChakraProvider } from "@chakra-ui/react"
import { DisplayNameProvider } from "./DisplayNameContext"
import { PartyProvider } from "./PartyContext"
import { QuizProvider } from "./QuizContext"
import { ReactNode } from "react"
import { SocketIOProvider } from "./SocketIOContext"
import { theme } from "../theme"
import { UserProvider } from "./UserContext"

interface Props {
  children: ReactNode
}

const contexts = [
  [DisplayNameProvider],
  [PartyProvider],
  [QuizProvider],
  [SocketIOProvider],
  [UserProvider],
  [ChakraProvider as any, { theme }]
]

export const Contexts = ({ children }: Props) => (
  <>
    {contexts.reduce((acc, [Context, props]) => {
      return <Context {...props}>{acc}</Context>
    }, children)}
  </>
)
