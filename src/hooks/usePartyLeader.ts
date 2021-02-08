import { User } from "types"

export const usePartyLeader = (partyMembers: User[]) => {
  const partyLeader = partyMembers.find(member => member.leader === true)
  return partyLeader
}
