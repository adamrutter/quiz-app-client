import { BrowserRouter as Router } from "react-router-dom"
import { Contexts } from "contexts/Contexts"
import React from "react"
import { Main } from "./App/Main"
import { Header } from "./App/Header"
import { Errors } from "./App/Errors"

export const App = () => (
  <Router>
    <Contexts>
      <Header />
      <Main />
      <Errors />
    </Contexts>
  </Router>
)
