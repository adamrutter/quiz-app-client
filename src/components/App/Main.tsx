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
import { Scoreboard } from "./Main/Scoreboard"
import React, { useContext, useEffect, useState } from "react"
import { SocketIO } from "contexts/SocketIOContext"

const Tab = ({ children, ...rest }: TabProps) => {
  return (
    <ChakraTab borderBottomWidth="2px" maxWidth="10em" px={5} {...rest}>
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
  const socket = useContext(SocketIO)

  const [tabIndex, setTabIndex] = useState(0)

  useEffect(() => {
    const quizStartListener = () => {
      setTabIndex(0)
    }

    socket.on("new-quiz-id", quizStartListener)

    return () => {
      socket.off("new-quiz-id", quizStartListener)
    }
  }, [])

  const handleTabClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const tabId = e.currentTarget.getAttribute("id")
    if (tabId) {
      const index = parseInt(tabId?.slice(-1))
      setTabIndex(index)
    }
  }

  return (
    <>
      <Tabs
        align="center"
        colorScheme="brand"
        size="lg"
        isFitted
        index={tabIndex}
        variant="enclosed"
      >
        <TabList>
          <Tab onClick={handleTabClick}>Quiz</Tab>
          <Tab onClick={handleTabClick}>Scores</Tab>
          <Tab onClick={handleTabClick}>Friends</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Quiz />
          </TabPanel>
          <TabPanel>
            <Scoreboard />
          </TabPanel>
          <TabPanel>
            <Party />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}
