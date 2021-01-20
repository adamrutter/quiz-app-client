export const useIsTimeLow = (time: number | undefined) => {
  if (time === 0) return true
  if (time && time < 5) return true
}
