import {
  Box,
  Button,
  FormControl,
  FormLabel as ChakraFormLabel,
  FormLabelProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  SimpleGridProps,
  useRadioGroup
} from "@chakra-ui/react"
import { BrandIcon } from "../../shared/BrandIcon"
import { OptionsRadioCard } from "./OptionsForm/OptionsRadioCard"
import { Party } from "contexts/PartyContext"
import { Quiz } from "contexts/QuizContext"
import { Socket } from "socket.io-client"
import { SocketIO } from "contexts/SocketIOContext"
import { useOpenTriviaCategories } from "hooks/useOpenTriviaCategories"
import React, { ReactText, useContext, useEffect, useState } from "react"

interface QuizOptions {
  category: number | undefined
  amount: string
  difficulty: string | undefined
  type: string | undefined
}

const FormLabel = ({ children, ...rest }: FormLabelProps) => {
  return (
    <ChakraFormLabel color="gray.500" fontWeight="bold" fontSize="sm" {...rest}>
      {children}
    </ChakraFormLabel>
  )
}

const FormLine = ({ children, ...rest }: SimpleGridProps) => {
  return (
    <SimpleGrid my={5} spacing={5} {...rest}>
      {React.Children.map(children, child => (
        <Box>{child}</Box>
      ))}
    </SimpleGrid>
  )
}

/**
 * Emit the form data to socket.io server. The provided options will be used to
 * fetch questions from Open Trivia DB and start a new quiz.
 *
 * @param e The form submission event.
 * @param socket A socket.io client.
 * @param options The Open Trivia DB options to send.
 */
const submitForm = (
  e: React.FormEvent<HTMLFormElement>,
  socket: Socket,
  partyId: string,
  options: QuizOptions
) => {
  e.preventDefault()
  socket.emit("start-quiz", { partyId, options })
}

export const OptionsForm = () => {
  const partyId = useContext(Party)
  const quizId = useContext(Quiz)
  const socket = useContext(SocketIO)

  const [categoryValue, setCategoryValue] = useState("Random")
  const [amountValue, setAmountValue] = useState("1")
  const [difficultyValue, setDifficultyValue] = useState<ReactText>("Random")
  const [typeValue, setTypeValue] = useState<ReactText>("Random")
  const [categoryId, setCategoryId] = useState<number | undefined>()
  const [difficulty, setDifficulty] = useState<string | undefined>()
  const [type, setType] = useState<string | undefined>()

  const selectCategories = useOpenTriviaCategories()

  // Keep track of options in correct form for API
  useEffect(() => {
    const obj = selectCategories?.find(
      category => category.name === categoryValue
    )
    setCategoryId(obj?.id)
  }, [selectCategories, categoryValue])

  useEffect(() => {
    const str =
      difficultyValue === "Random"
        ? undefined
        : difficultyValue.toString().toLowerCase()
    setDifficulty(str)
  }, [difficultyValue])

  useEffect(() => {
    let str

    if (typeValue === "Random") str = undefined
    if (typeValue === "Multiple choice") str = "multiple"
    if (typeValue === "True/false") str = "boolean"

    setType(str)
  }, [typeValue])

  // Send human formatted options to socket.io so they can be emitted to all clients
  useEffect(() => {
    const options = {
      category: categoryValue,
      amount: amountValue,
      difficulty: difficultyValue,
      type: typeValue
    }
    console.log(options)
    socket.emit("party-leader-quiz-options", options, partyId)
  }, [categoryValue, amountValue, difficultyValue, typeValue])

  // Set up the radio button cards
  // See https://chakra-ui.com/docs/form/radio#custom-radio-buttons
  const {
    getRootProps: getDifficultyRootProps,
    getRadioProps: getDifficultyRadioProps
  } = useRadioGroup({
    name: "difficulty",
    defaultValue: difficultyValue,
    onChange: value => setDifficultyValue(value)
  })
  const difficultyGroup = getDifficultyRootProps()

  const {
    getRootProps: getTypeRootProps,
    getRadioProps: getTypeRadioProps
  } = useRadioGroup({
    name: "category",
    defaultValue: typeValue,
    onChange: value => setTypeValue(value)
  })
  const typeGroup = getTypeRootProps()

  return (
    <>
      {/* 
      Using this conditional here instead of in the parent component so this
      component itself never unmounts (means state can be kept here rather than
      the parent) 
    */}
      {!quizId && (
        <form
          onSubmit={e =>
            submitForm(e, socket, partyId, {
              category: categoryId,
              amount: amountValue,
              difficulty,
              type
            })
          }
        >
          <FormLine minChildWidth="175px">
            <FormControl width="full">
              <FormLabel>Category</FormLabel>
              <Select
                focusBorderColor="brand.200"
                id="category-select"
                onChange={e => setCategoryValue(e.target.value)}
                value={categoryValue}
              >
                <option value="Random">Random</option>
                {selectCategories &&
                  selectCategories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Number of questions</FormLabel>
              <NumberInput
                inputMode="numeric"
                focusBorderColor="brand.200"
                max={50}
                min={1}
                onChange={stringValue =>
                  setAmountValue(stringValue.split(".")[0])
                }
                precision={0}
                value={amountValue}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </FormLine>
          <FormLine>
            <FormControl>
              <FormLabel>Difficulty</FormLabel>
              <SimpleGrid columns={[1, 2, 4]} spacing={2} {...difficultyGroup}>
                {["Random", "Easy", "Medium", "Hard"].map((value, index) => {
                  const radio = getDifficultyRadioProps({ value })
                  return (
                    <OptionsRadioCard
                      key={index}
                      onChange={(e: any) => console.log("hello")}
                      {...radio}
                    >
                      {value}
                    </OptionsRadioCard>
                  )
                })}
              </SimpleGrid>
            </FormControl>
          </FormLine>
          <FormLine>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <SimpleGrid columns={[1, 2, 3]} spacing={2} {...typeGroup}>
                {["Random", "Multiple choice", "True/false"].map(
                  (value, index) => {
                    const radio = getTypeRadioProps({ value })
                    return (
                      <OptionsRadioCard key={index} {...radio}>
                        {value}
                      </OptionsRadioCard>
                    )
                  }
                )}
              </SimpleGrid>
            </FormControl>
          </FormLine>
          <FormLine my={8}>
            <Button
              colorScheme="brand"
              leftIcon={<BrandIcon size="sm" />}
              px={7}
              size="lg"
              type="submit"
              w={["full", "unset"]}
            >
              Start quiz!
            </Button>
          </FormLine>
        </form>
      )}
    </>
  )
}
