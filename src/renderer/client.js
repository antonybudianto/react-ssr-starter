import "raf/polyfill"
import React from "react"
import { createRoot } from "react-dom"
import { loadableReady } from "@loadable/component"

import Root from "./root"
import "basscss/css/basscss.css"

function render(MyApp) {
  const root = createRoot(document.querySelector("#root"))
  root.render(<MyApp />)
}

loadableReady(() => {
  render(Root)
})

// if (module.hot) {
//   module.hot.accept("../layouts/CoreLayout", () => {
//     const MyApp = require("../layouts/CoreLayout").default
//     render(MyApp)
//   })
// }
