import {
  Box,
  FormLabel as ChakraFormLabel,
  FormLabelProps,
  SimpleGrid,
  SimpleGridProps
} from "@chakra-ui/react"
import { Children } from "react"

export const FormLabel = ({ children, ...rest }: FormLabelProps) => {
  return (
    <ChakraFormLabel color="gray.500" fontWeight="bold" fontSize="sm" {...rest}>
      {children}
    </ChakraFormLabel>
  )
}

export const FormLine = ({ children, ...rest }: SimpleGridProps) => {
  return (
    <SimpleGrid my={5} spacing={5} {...rest}>
      {Children.map(children, child => (
        <Box>{child}</Box>
      ))}
    </SimpleGrid>
  )
}
