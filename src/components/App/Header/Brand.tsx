import { Heading, Flex, FlexProps, useMultiStyleConfig } from "@chakra-ui/react"
import React from "react"
import { BrandIcon } from "../shared/BrandIcon"

export const theme = {
  parts: ["icon", "text"],
  sizes: {
    sm: {
      icon: { size: "md" },
      text: { fontSize: "md" }
    },
    md: {
      icon: { size: "lg" },
      text: { fontSize: "2xl" }
    }
  },
  defaultProps: {
    size: "md"
  }
}

interface Props extends FlexProps {
  size?: string
}

export const Brand = (props: Props) => {
  const styles = useMultiStyleConfig("Brand", props)

  return (
    <Flex alignItems="center" {...props}>
      <BrandIcon color="brand.400" mr={1} size={(styles.icon as any).size} />
      <Heading as="span" sx={styles.text}>
        Quiz App
      </Heading>
    </Flex>
  )
}
