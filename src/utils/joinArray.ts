// Join an array as it would be written in English
// from https://stackoverflow.com/a/29234240
export const joinArray = (arr: string[]) => {
  let outStr = ""
  if (arr.length === 1) {
    outStr = arr[0]
  } else if (arr.length === 2) {
    outStr = arr.join(" and ")
  } else if (arr.length > 2) {
    outStr = arr.slice(0, -1).join(", ") + ", and " + arr.slice(-1)
  }
  return outStr
}
