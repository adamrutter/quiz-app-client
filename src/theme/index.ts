import { colors } from "./colors"
import { extendTheme } from "@chakra-ui/react"
import { families, sizes, weights, textStyles } from "./fonts"
import { global } from "./global"
import { space } from "./layout"

export const theme = extendTheme({
  colors,
  fonts: families,
  fontSizes: sizes,
  fontWeights: weights,
  space,
  textStyles,
  styles: {
    global
  }
})
