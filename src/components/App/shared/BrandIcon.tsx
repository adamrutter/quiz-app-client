import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi"
import { chakra, ChakraProps, useStyleConfig } from "@chakra-ui/react"
import React from "react"

const Icon = chakra(GiPerspectiveDiceSixFacesRandom)

export const theme = {
  sizes: {
    sm: { fontSize: "xl" },
    md: { fontSize: "2xl" },
    lg: { fontSize: "3xl" }
  },
  defaultProps: {
    size: "md"
  }
}

interface Props extends ChakraProps {
  size?: string
}

export const BrandIcon = ({ size, ...rest }: Props) => {
  const styles = useStyleConfig("BrandIcon", { size })

  return <Icon sx={styles} {...rest} />
}
