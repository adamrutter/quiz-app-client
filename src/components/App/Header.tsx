import { Box, Container, Flex } from "@chakra-ui/react"
import { Brand } from "./Header/Brand"
import { ColorModeSwitcher } from "./Header/ColorModeSwitcher"
import React from "react"

export const Header = () => {
  return (
    <Box borderTopColor="brand.500" borderTopWidth={7} p={3}>
      <Container>
        <Flex justify="space-between">
          <Brand size="md" />
          <ColorModeSwitcher />
        </Flex>
      </Container>
    </Box>
  )
}
