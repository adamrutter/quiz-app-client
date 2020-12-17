import { ChakraProvider } from "@chakra-ui/react"
import { NotificationsProvider } from "../contexts/NotificationsContext"
import { PartyProvider } from "../contexts/PartyContext"
import { QuizProvider } from "../contexts/QuizContext"
import { SocketIOProvider } from "../contexts/SocketIOContext"
import { UserProvider } from "../contexts/UserContext"
import React from "react"
import { Main } from "./App/Main"
import { theme } from "../theme"
import { Header } from "./App/Header"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NotificationsProvider>
      <SocketIOProvider>
        <UserProvider>
          <PartyProvider>
            <QuizProvider>
              <Header />
              <Main />
            </QuizProvider>
          </PartyProvider>
        </UserProvider>
      </SocketIOProvider>
    </NotificationsProvider>
  </ChakraProvider>
)
