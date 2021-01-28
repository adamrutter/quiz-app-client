import {
  Button,
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  SimpleGrid,
  useRadioGroup
} from "@chakra-ui/react"
import { BrandIcon } from "../../shared/BrandIcon"
import { FormLabel, FormLine } from "./OptionsForm/Form"
import { OptionsRadioCard } from "./OptionsForm/OptionsRadioCard"
import { OpenTriviaDBOptions } from "types"
import { Party } from "contexts/PartyContext"
import { Quiz } from "contexts/QuizContext"
import { Socket } from "socket.io-client"
import { SocketIO } from "contexts/SocketIOContext"
import { useApiOptions } from "hooks/useApiOptions"
import { useOpenTriviaCategories } from "hooks/useOpenTriviaCategories"
import React, { ReactText, useContext, useEffect, useState } from "react"

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
  options: OpenTriviaDBOptions
) => {
  e.preventDefault()
  socket.emit("start-quiz", { partyId, options })
}

export const OptionsForm = () => {
  const partyId = useContext(Party)
  const quizId = useContext(Quiz)
  const socket = useContext(SocketIO)

  const [categoryFormValue, setCategoryFormValue] = useState("Random")
  const [amountFormValue, setAmountFormValue] = useState("1")
  const [typeFormValue, setTypeFormValue] = useState<ReactText>("Random")
  const [difficultyFormValue, setDifficultyFormValue] = useState<ReactText>(
    "Random"
  )

  const selectCategories = useOpenTriviaCategories()
  const apiOptions = useApiOptions(
    categoryFormValue,
    difficultyFormValue,
    typeFormValue,
    amountFormValue
  )

  // Send human formatted options to socket.io so they can be emitted to all clients
  useEffect(() => {
    const options = {
      category: categoryFormValue,
      amount: amountFormValue,
      difficulty: difficultyFormValue,
      type: typeFormValue
    }
    socket.emit("party-leader-quiz-options", options, partyId)
  }, [categoryFormValue, amountFormValue, difficultyFormValue, typeFormValue])

  // Set up the radio button cards
  // See https://chakra-ui.com/docs/form/radio#custom-radio-buttons
  const {
    getRootProps: getDifficultyRootProps,
    getRadioProps: getDifficultyRadioProps
  } = useRadioGroup({
    name: "difficulty",
    defaultValue: difficultyFormValue,
    onChange: value => setDifficultyFormValue(value)
  })
  const difficultyGroup = getDifficultyRootProps()

  const {
    getRootProps: getTypeRootProps,
    getRadioProps: getTypeRadioProps
  } = useRadioGroup({
    name: "category",
    defaultValue: typeFormValue,
    onChange: value => setTypeFormValue(value)
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
        <form onSubmit={e => submitForm(e, socket, partyId, apiOptions)}>
          <FormLine minChildWidth="175px">
            <FormControl width="full">
              <FormLabel>Category</FormLabel>
              <Select
                focusBorderColor="brand.200"
                id="category-select"
                onChange={e => setCategoryFormValue(e.target.value)}
                value={categoryFormValue}
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
                  setAmountFormValue(stringValue.split(".")[0])
                }
                precision={0}
                value={amountFormValue}
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
