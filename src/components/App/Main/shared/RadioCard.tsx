import { Box, Flex, useStyleConfig } from "@chakra-ui/react"
import React, { HTMLProps } from "react"

export interface ChildProps {
  children: React.ReactNode
  name?: string
  defaultValue?: string | number | readonly string[] | undefined
  key?: string | number | null
}

interface Props {
  children: React.ReactNode
  input: HTMLProps<HTMLInputElement> | any
  checkbox: HTMLProps<any> | any
  colorScheme?: string
}

interface StyleOptions {
  colorScheme: string
  colorMode: string
}

export const theme = {
  baseStyle: ({ colorScheme, colorMode }: StyleOptions) => {
    return {
      _checked: {
        bg: colorMode === "light" ? `${colorScheme}.200` : `${colorScheme}.100`,
        borderColor:
          colorMode === "light" ? `${colorScheme}.300` : `${colorScheme}.200`,
        color:
          colorMode === "light" ? `${colorScheme}.900` : `${colorScheme}.700`
      }
    }
  }
}

/**
 * Renders a radio button type input as a card.
 *
 * Children will be laid out using flex. It's probable you only want two
 * children (a value and a radio type indicator).
 *
 * See https://chakra-ui.com/docs/form/radio#custom-radio-buttons for more info
 * on the hooks/types required.
 */
export const RadioCard = (props: Props) => {
  const { children, input, checkbox, colorScheme = "blue" } = props

  const styles = useStyleConfig("RadioCard", {
    colorScheme: colorScheme
  })

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        alignItems="center"
        borderWidth="1px"
        borderRadius="md"
        cursor="pointer"
        height="full"
        justifyContent="space-between"
        px={3}
        py={1}
        sx={styles}
        {...checkbox}
        _focus={{
          boxShadow: "outline"
        }}
      >
        {children}
      </Flex>
    </Box>
  )
}
