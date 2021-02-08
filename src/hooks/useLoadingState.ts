import { Party } from "contexts/PartyContext"
import { useContext } from "react"
import { usePartyMembers } from "./usePartyMembers"
import { usePartyLeader } from "./usePartyLeader"

export const useLoadingState = () => {
  const partyId = useContext(Party)
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = usePartyLeader(partyMembers)

  const loadingState = partyLeader === undefined && partyMembers.length === 0
  return loadingState
}
