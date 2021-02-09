import { Badge, Box, Divider, Flex, Progress } from "@chakra-ui/react"
import { Timer } from "./Timer"
import { useIsTimeLow } from "hooks/useIsTimeLow"
import React from "react"

interface Props {
  amountOfQuestions: number
  currentQuestionNumber: string
  time: number | undefined
  timeLimit: number | undefined
}

export const Header = (props: Props) => {
  const timeLow = useIsTimeLow(props.time)
  const timeLeftPercentage =
    props.time && props.timeLimit && props.time / props.timeLimit

  return (
    <>
      <Flex justifyContent="space-between">
        <Flex
          alignItems={["flex-start", "center"]}
          direction={["column", "row"]}
        >
          <Badge colorScheme="brand" mb={[1, 0]} mr={[0, 2]} variant="solid">
            Question
          </Badge>{" "}
          <Box textAlign="left">
            <Box as="span" fontWeight="bold">
              {props.currentQuestionNumber}
            </Box>
            <Box as="span" color="gray.500" fontSize="xs">
              {" "}
              of {props.amountOfQuestions}
            </Box>
          </Box>
        </Flex>
        <Timer time={props.time} />
      </Flex>
      <Progress
        colorScheme={timeLow ? "red" : "green"}
        display="flex"
        max={1}
        min={0}
        mt={4}
        size="xs"
        value={timeLeftPercentage === undefined ? 1 : timeLeftPercentage}
      />
      <Divider />
    </>
  )
}
