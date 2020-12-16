import { ChakraProvider } from "@chakra-ui/react"
import { NotificationsProvider } from "../contexts/NotificationsContext"
import { PartyProvider } from "../contexts/PartyContext"
import { QuizProvider } from "../contexts/QuizContext"
import { SocketIOProvider } from "../contexts/SocketIOContext"
import { UserProvider } from "../contexts/UserContext"
import React from "react"
import { theme } from "../theme"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NotificationsProvider>
      <SocketIOProvider>
        <UserProvider>
          <PartyProvider>
            <QuizProvider></QuizProvider>
          </PartyProvider>
        </UserProvider>
      </SocketIOProvider>
    </NotificationsProvider>
  </ChakraProvider>
)
