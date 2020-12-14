import React, { createContext, ReactNode, useState } from "react"

interface Props {
  children?: ReactNode
}

interface Notification {
  title: string
  msg: string
  variant: string
}

type Notifications = Array<Notification>

const initialState = {
  notifications: [] as Notifications,
  setNotifications: (state: Notifications) => {}
}

export const NotificationsContext = createContext(initialState)

export const NotificationsProvider = (props: Props) => {
  const [notifications, setNotifications] = useState(initialState.notifications)

  return (
    <NotificationsContext.Provider value={{ notifications, setNotifications }}>
      {props.children}
    </NotificationsContext.Provider>
  )
}
