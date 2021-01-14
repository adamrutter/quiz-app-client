import { ChangeName } from "./Party/ChangeName"
import { Divider } from "@chakra-ui/react"
import { InviteFriends } from "./Party/InviteFriends"
import { PartyMembers } from "./Party/PartyMembers"
import React from "react"

export const Party = () => {
  return (
    <>
      <InviteFriends />
      <Divider my={7} />
      <PartyMembers />
      <ChangeName />
    </>
  )
}
