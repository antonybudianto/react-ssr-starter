import 'babel-polyfill'
import 'raf/polyfill'

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadComponents } from 'loadable-components'

import { createClientStore } from '../store/createStore'
import CoreLayout from '../layouts/CoreLayout'
import 'basscss/css/basscss.css'
const store = createClientStore(window.INITIAL_STATE)

function render(MyApp) {
  hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <MyApp />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
  )
}

loadComponents().then(() => {
  render(CoreLayout)
})

// if (module.hot) {
//   module.hot.accept('../layouts/CoreLayout', () => {
//     const MyApp = require('../layouts/CoreLayout').default
//     render(MyApp)
//   })
// }
