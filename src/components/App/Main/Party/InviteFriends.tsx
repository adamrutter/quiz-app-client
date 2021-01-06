import {
  Button,
  Code,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import { Party as PartyId } from "contexts/PartyContext"
import { MdContentCopy } from "react-icons/md"
import React, { useContext, useRef } from "react"

export const InviteFriends = () => {
  const partyId = useContext(PartyId)
  const joinUrl = `localhost:3000/?join=${partyId}`

  const linkRef = useRef<HTMLInputElement>(null)

  const linkContainerBg = useColorModeValue("gray.50", "gray.700")
  const linkContainerBorderColor = useColorModeValue("gray.200", "gray.600")

  const clickHandler = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (linkRef.current !== null) {
      linkRef.current.select()
      document.execCommand("copy")
    }
  }

  return (
    <>
      <Text>
        Your friends can join your party and compete against you by visiting
        this link:
      </Text>
      <HStack
        bg={linkContainerBg}
        border="1px solid"
        borderColor={linkContainerBorderColor}
        borderRadius="md"
        colorScheme="gray"
        my={4}
        p={1}
        pl={3}
      >
        <Code
          bg="none"
          flexShrink={2}
          overflowX="scroll"
          p={0}
          whiteSpace="nowrap"
        >
          {joinUrl}
        </Code>
        <Button
          colorScheme="brand"
          leftIcon={<MdContentCopy />}
          onClick={clickHandler}
          px={5}
          size="sm"
        >
          Copy link
        </Button>
      </HStack>
      <VisuallyHidden>
        <Input aria-hidden="true" ref={linkRef} value={joinUrl} />
      </VisuallyHidden>
    </>
  )
}
