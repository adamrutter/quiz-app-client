import { usePartyMembers } from "./usePartyMembers"

export const usePartyLeader = (partyId: string) => {
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = partyMembers.find(member => member.leader === true)

  return partyLeader
}
