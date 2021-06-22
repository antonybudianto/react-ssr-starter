import "raf/polyfill"
import React from "react"
import { hydrate } from "react-dom"
import { loadableReady } from "@loadable/component"

import Root from "./root"
import "basscss/css/basscss.css"

function render(MyApp) {
  hydrate(<MyApp />, document.querySelector("#root"))
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
