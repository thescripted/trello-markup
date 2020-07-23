import React from "react"
import ReactDOM from "react-dom"
import "./style.css"
import App from "./App"
import { createClient, Provider } from "urql"

const client = createClient({
  url: "http://localhost:8000/graphql"
})

ReactDOM.render(
  <React.StrictMode>
    <Provider value={client}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
