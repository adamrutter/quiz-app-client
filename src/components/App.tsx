import { Main } from "./App/Main"
import { Header } from "./App/Header"
import { Errors } from "./App/Errors"
import { Party } from "contexts/PartyContext"
import { Redirect } from "react-router-dom"
import { SocketIO } from "contexts/SocketIOContext"
import { useLoadingState } from "hooks/useLoadingState"
import { usePartyLeader } from "hooks/usePartyLeader"
import { usePartyMembers } from "hooks/usePartyMembers"
import { User } from "contexts/UserContext"
import { User as UserType } from "types"
import { useToast } from "@chakra-ui/react"
import queryString from "query-string"
import React, { useContext, useEffect } from "react"

export const App = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)
  const partyMembers = usePartyMembers(partyId)
  const partyLeader = usePartyLeader(partyMembers)
  const isLoading = useLoadingState()
  const toast = useToast()

  const { join: requestedParty } = queryString.parse(window.location.search)

  // Handle the user being removed from the current party
  useEffect(() => {
    const listener = (user: UserType) => {
      if (userId === user.id) window.location.reload()
    }
    socket.on("user-leaving-party", listener)
    return () => {
      socket.off("user-leaving-party", listener)
    }
  }, [socket, userId])

  // Join the requested party
  useEffect(() => {
    if (requestedParty && userId) {
      socket.emit("does-party-exist", requestedParty)
      socket.once("party-exists", (exists: boolean) => {
        if (exists) {
          socket.emit("join-party", requestedParty, userId)
        } else {
          socket.emit("request-new-party", userId)
        }
      })
    }
  }, [partyId, requestedParty, socket, userId])

  // Request a new party
  useEffect(() => {
    if (!requestedParty && !partyId && userId)
      socket.emit("request-new-party", userId)
  }, [partyId, requestedParty, socket, userId])

  // Remove the user from the party on page unload
  useEffect(() => {
    window.onunload = () => socket.emit("kick-party-member", userId, partyId)
  })

  // Notify if party leader has left the party
  useEffect(() => {
    if (!isLoading && partyMembers && !partyLeader)
      toast({
        description:
          "The party leader has left. Please reload the page or join a new party.",
        status: "error",
        duration: null,
        position: "bottom-right"
      })
  }, [isLoading, partyLeader, partyMembers, toast])

  // Notify when a user leaves the party
  useEffect(() => {
    const listener = (user: UserType) => {
      if (userId !== user.id && user.name) {
        toast({
          description: `${user.name} left the party.`,
          status: "warning",
          position: "bottom-right"
        })
      }
    }
    socket.on("user-leaving-party", listener)
    return () => {
      socket.off("user-leaving-party", listener)
    }
  }, [socket, toast, userId])

  return (
    <>
      <Header />
      <Main />
      <Errors />

      {requestedParty && userId && <Redirect to="/" />}
    </>
  )
}
