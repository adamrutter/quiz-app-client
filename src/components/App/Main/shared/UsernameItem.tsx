import { Flex, ListIcon, Text } from "@chakra-ui/react"
import { User } from "contexts/UserContext"
import React, { FunctionComponent, useContext } from "react"

interface Props {
  color?: string
  fontSize?: string
  icon?: FunctionComponent
  id: string
  name: string
}

export const UsernameItem = ({
  color,
  fontSize = "md",
  icon,
  id,
  name
}: Props) => {
  const userId = useContext(User)
  const thisUser = id === userId

  return (
    <>
      <Flex align="baseline" fontSize={fontSize}>
        {icon && (
          <ListIcon
            alignSelf="center"
            as={icon}
            color={color || "gray.500"}
            mr={2}
            verticalAlign="sub"
          />
        )}
        {name}
        <Text as="span" color="gray.500" fontSize="xs" ml={1}>
          {thisUser && " (you) "}
        </Text>
      </Flex>
    </>
  )
}
