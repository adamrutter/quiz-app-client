import { Tab, Tabs, TabList, TabPanel, TabPanels } from "@chakra-ui/react"
import { Party } from "./Main/Party"
import { Quiz } from "./Main/Quiz"
import React from "react"

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
