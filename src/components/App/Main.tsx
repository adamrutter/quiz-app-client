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
import React, { useState } from "react"

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
      <Container px={1}>{children}</Container>
    </ChakraTabPanel>
  )
}

export const Main = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <Tabs
        align="center"
        colorScheme="brand"
        size="lg"
        index={tabIndex}
        onChange={i => setTabIndex(i)}
        variant="soft-rounded"
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
