import { ChakraProvider, theme } from "@chakra-ui/react"
import { NotificationsProvider } from "../contexts/NotificationsContext"
import React from "react"

export const App = () => (
  <ChakraProvider theme={theme}>
    <NotificationsProvider></NotificationsProvider>
  </ChakraProvider>
)
