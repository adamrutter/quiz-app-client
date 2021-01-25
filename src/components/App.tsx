import { BrowserRouter as Router } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { DisplayNameProvider } from "../contexts/DisplayNameContext"
import { PartyProvider } from "../contexts/PartyContext"
import { QuizProvider } from "../contexts/QuizContext"
import { SocketIOProvider } from "../contexts/SocketIOContext"
import { UserProvider } from "../contexts/UserContext"
import React from "react"
import { Main } from "./App/Main"
import { theme } from "../theme"
import { Header } from "./App/Header"
import { PartyMembersProvider } from "contexts/PartyMembersContext"
import { Errors } from "./App/Errors"

export const App = () => (
  <Router>
    <ChakraProvider theme={theme}>
      <SocketIOProvider>
        <UserProvider>
          <PartyProvider>
            <QuizProvider>
              <DisplayNameProvider>
                <PartyMembersProvider>
                  <Header />
                  <Main />
                  <Errors />
                </PartyMembersProvider>
              </DisplayNameProvider>
            </QuizProvider>
          </PartyProvider>
        </UserProvider>
      </SocketIOProvider>
    </ChakraProvider>
  </Router>
)
