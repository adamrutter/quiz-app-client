import { PartyMembers } from "contexts/PartyMembersContext"
import { useContext } from "react"

export const usePartyLeader = () => {
  const partyMembers = useContext(PartyMembers)
  const partyLeader = partyMembers.find(member => member.leader === true)

  return partyLeader
}
