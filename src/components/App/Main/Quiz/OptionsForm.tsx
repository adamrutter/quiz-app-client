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
import { useQuestionTypes } from "hooks/useQuestionTypes"
import { OptionsRadioCard } from "./OptionsForm/OptionsRadioCard"
import { OpenTriviaDBCategory, Options, OptionsVariant } from "types"
import { useOptionsVariant } from "hooks/useOptionsVariant"
import { Party } from "contexts/PartyContext"
import { Quiz } from "contexts/QuizContext"
import { Socket } from "socket.io-client"
import { SocketIO } from "contexts/SocketIOContext"
import { useOpenTriviaCategories } from "hooks/useOpenTriviaCategories"
import React, { useContext, useEffect, useReducer } from "react"

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
  options: OptionsVariant
) => {
  e.preventDefault()
  socket.emit("start-quiz", { partyId, options })
}

const initialOptions = {
  category: {
    api: undefined,
    human: "Random"
  },
  difficulty: {
    api: undefined,
    human: "Random"
  },
  amount: {
    api: "1",
    human: "1"
  },
  type: {
    api: undefined,
    human: "Random"
  },
  time: {
    api: "20",
    human: "20"
  }
}

interface Action {
  type: string
  payload: {
    api?: string | undefined
    human: string
  }
}

const optionsReducer = (state: Options, { type, payload }: Action): Options => {
  switch (type) {
    case "category":
      return { ...state, category: { api: payload.api, human: payload.human } }
    case "difficulty":
      return {
        ...state,
        difficulty: { api: payload.api, human: payload.human }
      }
    case "amount":
      return { ...state, amount: { api: payload.api, human: payload.human } }
    case "type":
      return { ...state, type: { api: payload.api, human: payload.human } }
    case "time":
      return { ...state, time: { api: payload.api, human: payload.human } }
    default:
      return state
  }
}

// Return an id for the given category name (from Open Trivia DB)
const categoryId = (name: string, categories: OpenTriviaDBCategory[]) => {
  const id = categories?.find(category => category.name === name)?.id.toString()
  return id
}

export const OptionsForm = () => {
  const partyId = useContext(Party)
  const quizId = useContext(Quiz)
  const socket = useContext(SocketIO)

  const [options, dispatch] = useReducer(optionsReducer, initialOptions)
  const apiOptions = useOptionsVariant(options, "api")
  const humanOptions = useOptionsVariant(options, "human")

  const categories = useOpenTriviaCategories()
  const types = useQuestionTypes()

  // Send human formatted options to socket.io so they can be emitted to all clients
  useEffect(() => {
    socket.emit("party-leader-quiz-options", humanOptions, partyId)
  }, [humanOptions])

  // Set up the radio button cards
  // See https://chakra-ui.com/docs/form/radio#custom-radio-buttons
  const {
    getRootProps: getDifficultyRootProps,
    getRadioProps: getDifficultyRadioProps
  } = useRadioGroup({
    name: "difficulty",
    defaultValue: initialOptions.difficulty.human,
    onChange: (value: string) =>
      dispatch({
        type: "difficulty",
        payload: {
          api: value === "Random" ? undefined : value.toLowerCase(),
          human: value
        }
      })
  })
  const difficultyGroup = getDifficultyRootProps()

  const {
    getRootProps: getTypeRootProps,
    getRadioProps: getTypeRadioProps
  } = useRadioGroup({
    name: "category",
    defaultValue: initialOptions.category.human,
    onChange: (value: string) =>
      dispatch({
        type: "type",
        payload: { api: types.get(value), human: value }
      })
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
          <FormLine columns={[1, 2, 3]}>
            <FormControl width="full">
              <FormLabel>Category</FormLabel>
              <Select
                focusBorderColor="brand.200"
                id="category-select"
                onChange={e => {
                  dispatch({
                    type: "category",
                    payload: {
                      api: categoryId(e.target.value, categories),
                      human: e.target.value
                    }
                  })
                }}
                value={options.category.human}
              >
                <option value="Random">Random</option>
                {categories &&
                  categories.map((category, index) => (
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
                  dispatch({
                    type: "amount",
                    payload: {
                      api: stringValue.split(".")[0],
                      human: stringValue.split(".")[0]
                    }
                  })
                }
                precision={0}
                value={options.amount.human}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Time Limit</FormLabel>
              <NumberInput
                inputMode="numeric"
                focusBorderColor="brand.200"
                max={60}
                min={5}
                onChange={stringValue =>
                  dispatch({
                    type: "time",
                    payload: {
                      api: stringValue.split(".")[0],
                      human: stringValue.split(".")[0]
                    }
                  })
                }
                precision={0}
                value={options.time.human}
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
