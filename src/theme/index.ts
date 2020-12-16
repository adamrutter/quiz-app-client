import { colors } from "./colors"
import { components } from "./components"
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
  components,
  styles: {
    global
  }
})
