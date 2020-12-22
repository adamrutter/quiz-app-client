import { Badge, Box, HStack, useColorMode } from "@chakra-ui/react"
import { SocketIO } from "contexts/SocketIOContext"
import React, { useContext, useState } from "react"

export const Timer = () => {
  const socket = useContext(SocketIO)

  const { colorMode } = useColorMode()
  const color = {
    danger: colorMode === "light" ? "red.600" : "red.400",
    normal: colorMode === "light" ? "black" : "white",
    subtle: colorMode === "light" ? "gray.500" : "gray.500"
  }

  // Handle a timer update from the socket.io server
  const [time, setTime] = useState(10)
  socket.on("timer-update", (time: string) => setTime(parseInt(time)))

  return (
    <HStack spacing={2}>
      <Box>
        <Box
          as="span"
          color={time < 5 ? color.danger : color.normal}
          fontWeight="bold"
        >
          {time}{" "}
        </Box>
        <Box
          as="span"
          color={time < 5 ? color.danger : color.subtle}
          fontSize="sm"
        >
          seconds
        </Box>
      </Box>
      <Badge colorScheme={time < 5 ? "red" : "brand"} variant="solid">
        Time left
      </Badge>
    </HStack>
  )
}
