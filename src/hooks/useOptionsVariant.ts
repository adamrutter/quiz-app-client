import { Options, OptionsVariant } from "types"

export const useOptionsVariant = (
  options: Options,
  type: "api" | "human"
): OptionsVariant => {
  const data = Object.fromEntries(
    Object.entries(options).map(([key, value]) => [key, value[type]])
  ) as OptionsVariant

  return data
}
