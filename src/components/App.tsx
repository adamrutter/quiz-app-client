import { Main } from "./App/Main"
import { Header } from "./App/Header"
import { Errors } from "./App/Errors"
import { Party } from "contexts/PartyContext"
import { Redirect } from "react-router-dom"
import { SocketIO } from "contexts/SocketIOContext"
import { User } from "contexts/UserContext"
import queryString from "query-string"
import React, { useContext, useEffect } from "react"

export const App = () => {
  const socket = useContext(SocketIO)
  const userId = useContext(User)
  const partyId = useContext(Party)

  const { join: requestedParty } = queryString.parse(window.location.search)

  // Request a user ID
  useEffect(() => {
    if (!userId) socket.emit("request-user-id")
  }, [socket, userId])

  // Handle the user being removed from the current party
  useEffect(() => {
    const listener = (userLeavingId: string) => {
      if (userId === userLeavingId) window.location.reload()
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

  return (
    <>
      <Header />
      <Main />
      <Errors />

      {requestedParty && userId && <Redirect to="/" />}
    </>
  )
}
