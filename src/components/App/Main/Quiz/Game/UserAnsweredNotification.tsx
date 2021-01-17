import { Box, Icon, useColorModeValue } from "@chakra-ui/react"
import { FaCheckCircle } from "react-icons/fa"
import React from "react"

interface Props {
  user: string
}

export const UserAnsweredNotification = ({ user }: Props) => {
  const bgColor = useColorModeValue("brand.400", "brand.200")

  return (
    <Box bg={bgColor} borderRadius="md" textColor="black" p={4}>
      <Icon as={FaCheckCircle} mr={2} />
      {`${user} answered!`}
    </Box>
  )
}
