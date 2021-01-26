import { usePartyMembers } from "./usePartyMembers"

export const usePartyLeader = () => {
  const partyMembers = usePartyMembers()
  const partyLeader = partyMembers.find(member => member.leader === true)

  return partyLeader
}
