export const useQuestionTypes = () => {
  let map = new Map()
  map.set("Random", undefined)
  map.set("Multiple choice", "multiple")
  map.set("True/false", "boolean")

  return map
}
