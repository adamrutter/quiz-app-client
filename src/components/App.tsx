import { ChakraProvider, theme } from "@chakra-ui/react"
import { NotificationsProvider } from "../contexts/NotificationsContext"
import { SocketIOProvider } from "../contexts/SocketIOContext"
import React from "react"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NotificationsProvider>
      <SocketIOProvider></SocketIOProvider>
    </NotificationsProvider>
  </ChakraProvider>
)
