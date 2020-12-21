import { Box, Circle, useColorMode, useRadio } from "@chakra-ui/react"
import { ChildProps as Props, RadioCard } from "../../shared/RadioCard"
import React from "react"

export const OptionsRadioCard = (props: Props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props)
  const input = getInputProps()
  const checkbox = getCheckboxProps()

  const { colorMode } = useColorMode()

  return (
    <RadioCard checkbox={checkbox} colorScheme="brand" input={input}>
      <Box>{props.children}</Box>
      <Circle
        bg={colorMode === "light" ? "gray.300" : "gray.900"}
        borderColor={colorMode === "light" ? "gray.300" : "gray.700"}
        borderWidth="1px"
        h={4}
        w={4}
        _checked={{
          bg: "brand.400",
          borderColor: "brand.400"
        }}
        {...checkbox}
      >
        <Circle h={"8px"} w={"8px"} {...checkbox} _checked={{ bg: "white" }} />
      </Circle>
    </RadioCard>
  )
}
