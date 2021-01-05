import { Badge, Box, HStack, useColorMode } from "@chakra-ui/react"
import React from "react"

interface Props {
  time: number
}

export const Timer = (props: Props) => {
  const { colorMode } = useColorMode()
  const color = {
    danger: colorMode === "light" ? "red.600" : "red.400",
    normal: colorMode === "light" ? "black" : "white",
    subtle: colorMode === "light" ? "gray.500" : "gray.500"
  }

  return (
    <HStack spacing={2}>
      <Box>
        <Box
          as="span"
          color={props.time < 5 ? color.danger : color.normal}
          fontWeight="bold"
        >
          {props.time}{" "}
        </Box>
        <Box
          as="span"
          color={props.time < 5 ? color.danger : color.subtle}
          fontSize="sm"
        >
          seconds
        </Box>
      </Box>
      <Badge colorScheme={props.time < 5 ? "red" : "brand"} variant="solid">
        Time left
      </Badge>
    </HStack>
  )
}
