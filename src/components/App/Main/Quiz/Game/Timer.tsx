import { Badge, Box, HStack, useColorMode } from "@chakra-ui/react"
import { useIsTimeLow } from "hooks/useIsTimeLow"
import React from "react"

interface Props {
  time: number | undefined
}

export const Timer = (props: Props) => {
  const { colorMode } = useColorMode()
  const timeLow = useIsTimeLow(props.time)

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
          color={timeLow ? color.danger : color.normal}
          fontWeight="bold"
        >
          {props.time}{" "}
        </Box>
        <Box
          as="span"
          color={timeLow ? color.danger : color.subtle}
          fontSize="sm"
        >
          seconds
        </Box>
      </Box>
      <Badge colorScheme={timeLow ? "red" : "brand"} variant="solid">
        Time left
      </Badge>
    </HStack>
  )
}
