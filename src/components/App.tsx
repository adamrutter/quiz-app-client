import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { DisplayNameProvider } from "../contexts/DisplayNameContext"
import { NotificationsProvider } from "../contexts/NotificationsContext"
import { PartyProvider } from "../contexts/PartyContext"
import { QuizProvider } from "../contexts/QuizContext"
import { SocketIOProvider } from "../contexts/SocketIOContext"
import { UserProvider } from "../contexts/UserContext"
import React from "react"
import { Main } from "./App/Main"
import { theme } from "../theme"
import { Header } from "./App/Header"
import { PartyMembersProvider } from "contexts/PartyMembersContext"

export const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <NotificationsProvider>
        <SocketIOProvider>
          <UserProvider>
            <PartyProvider>
              <QuizProvider>
                <DisplayNameProvider>
                  <PartyMembersProvider>
                    <Header />
                    <Main />
                  </PartyMembersProvider>
                </DisplayNameProvider>
              </QuizProvider>
            </PartyProvider>
          </UserProvider>
        </SocketIOProvider>
      </NotificationsProvider>
    </ChakraProvider>
  </Router>
)
