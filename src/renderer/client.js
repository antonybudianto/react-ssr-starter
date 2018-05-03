import 'babel-polyfill'
import 'raf/polyfill'

import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { loadComponents } from 'loadable-components'

import { createClientStore } from '../store/createStore'
import CoreLayout from '../layouts/CoreLayout'

loadComponents().then(() => {
  hydrate(
    <Provider store={createClientStore(window.INITIAL_STATE)}>
      <BrowserRouter>
        <CoreLayout />
      </BrowserRouter>
    </Provider>,
    document.querySelector('#root')
  )
})

if (module.hot) {
  module.hot.accept()
}
