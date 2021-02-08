import { Box, Progress, Text } from "@chakra-ui/react"
import { default as indefiniteArticle } from "indefinite"
import { PanaHavingFun } from "svg/PanaHavingFun"
import { Party } from "contexts/PartyContext"
import { useChosenOptions } from "hooks/useChosenOptions"
import { usePartyLeader } from "hooks/usePartyLeader"
import { usePartyMembers } from "hooks/usePartyMembers"
import React, { useContext } from "react"

export const WaitForStart = () => {
  const partyId = useContext(Party)
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = usePartyLeader(partyMembers)

  const chosenOptions = useChosenOptions()

  const categoryIndefiniteArticle = chosenOptions
    ? indefiniteArticle(chosenOptions?.category, { articleOnly: true })
    : "a"

  return (
    <Box my={5}>
      <Box>
        <Text fontSize="xl" my={2}>
          <Text as="span" fontWeight="bold">
            {partyLeader?.name || "Party leader"}
          </Text>{" "}
          is about to start {categoryIndefiniteArticle}{" "}
          <Text as="span" fontWeight="bold">
            {chosenOptions?.category}
          </Text>{" "}
          quiz!
        </Text>
      </Box>
      <Box my={7}>
        <PanaHavingFun />
      </Box>
      <Box>
        <Text fontSize="xl">Please wait... </Text>
        <Progress
          colorScheme="brand"
          isIndeterminate
          my={5}
          size="xs"
          width="75%"
        />
      </Box>
    </Box>
  )
}
