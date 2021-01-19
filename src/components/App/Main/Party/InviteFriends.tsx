import {
  Button,
  Code,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VisuallyHidden
} from "@chakra-ui/react"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { Party as PartyId } from "contexts/PartyContext"
import { MdContentCopy } from "react-icons/md"
import React, { useContext, useRef } from "react"

export const InviteFriends = () => {
  const partyId = useContext(PartyId)
  const joinUrl = `${process.env.REACT_APP_CLIENT_URL}/?join=${partyId}`

  const linkRef = useRef<HTMLInputElement>(null)

  const linkContainerBg = useColorModeValue("gray.50", "gray.700")
  const linkContainerBorderColor = useColorModeValue("gray.200", "gray.600")

  return (
    <>
      <Text align="left">Invite friends</Text>
      <Text align="left" color="gray.500" fontSize="xs">
        Your friends can join your party and compete against you by visiting
        this link
      </Text>
      <HStack
        bg={linkContainerBg}
        border="1px solid"
        borderColor={linkContainerBorderColor}
        borderRadius="md"
        colorScheme="gray"
        my={3}
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
        <CopyToClipboard text={joinUrl}>
          <Button
            colorScheme="brand"
            leftIcon={<MdContentCopy />}
            px={5}
            size="sm"
          >
            Copy link
          </Button>
        </CopyToClipboard>
      </HStack>
      <VisuallyHidden>
        <Input aria-hidden="true" ref={linkRef} value={joinUrl} />
      </VisuallyHidden>
    </>
  )
}
