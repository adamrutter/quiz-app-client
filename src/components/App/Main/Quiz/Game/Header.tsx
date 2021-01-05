import { Badge, Box, Divider, Flex, HStack } from "@chakra-ui/react"
import { Timer } from "./Timer"
import React from "react"

interface Props {
  amountOfQuestions: string
  currentQuestionNumber: string
  time: number
}

export const Header = (props: Props) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <HStack spacing={2}>
          <Box>
            <Badge colorScheme="brand" variant="solid">
              Question
            </Badge>{" "}
            <Box as="span" fontWeight="bold">
              {props.currentQuestionNumber}
            </Box>
            <Box as="span" color="gray.500" fontSize="xs">
              {" "}
              of {props.amountOfQuestions}
            </Box>
          </Box>
        </HStack>
        <Timer time={props.time} />
      </Flex>
      <Divider mt={4} />
    </>
  )
}
