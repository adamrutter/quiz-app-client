import { App } from "./components/App"
import { BrowserRouter as Router } from "react-router-dom"
import { ColorModeScript } from "@chakra-ui/react"
import { Contexts } from "contexts/Contexts"
import * as React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript />
    <Router>
      <Contexts>
        <App />
      </Contexts>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)
