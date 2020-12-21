import {
  Container,
  Tab as ChakraTab,
  Tabs,
  TabList,
  TabPanel as ChakraTabPanel,
  TabPanelProps,
  TabPanels,
  TabProps
} from "@chakra-ui/react"
import { Party } from "./Main/Party"
import { Quiz } from "./Main/Quiz"
import React from "react"

const Tab = ({ children, ...rest }: TabProps) => {
  return (
    <ChakraTab px={5} {...rest}>
      {children}
    </ChakraTab>
  )
}

const TabPanel = ({ children, ...rest }: TabPanelProps) => {
  return (
    <ChakraTabPanel my={6} {...rest}>
      <Container>{children}</Container>
    </ChakraTabPanel>
  )
}

export const Main = () => {
  return (
    <>
      <Tabs align="center" colorScheme="brand" size="lg" variant="soft-rounded">
        <TabList>
          <Tab>Quiz</Tab>
          <Tab>Invite Friends</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Quiz />
          </TabPanel>
          <TabPanel>
            <Party />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
