import { Badge, Box, Divider, Flex, HStack } from "@chakra-ui/react"
import React from "react"
import { Timer } from "./Timer"
import { Question } from "../Game"

interface Props {
  question: Question
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
              {props.question.number + 1}
            </Box>
            <Box as="span" color="gray.500" fontSize="xs">
              /{props.question.total}
            </Box>
          </Box>
        </HStack>
        <Timer />
      </Flex>
      <Divider mt={4} />
    </>
  )
}
