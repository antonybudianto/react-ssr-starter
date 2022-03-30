import "raf/polyfill"
import React from "react"
import { hydrateRoot } from "react-dom/client"

import Root from "./root"
import "basscss/css/basscss.css"

function render(MyApp) {
  hydrateRoot(document.querySelector("#root"), <MyApp />, {
    onRecoverableError: e => {
      console.log(e)
    }
  })
}

render(Root)

// if (module.hot) {
//   module.hot.accept("../layouts/CoreLayout", () => {
//     const MyApp = require("../layouts/CoreLayout").default
//     render(MyApp)
//   })
// }
