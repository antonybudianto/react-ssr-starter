import React, { Component } from 'react'

import './HomeView.scss'
import TestView from './TestView'

class HomeView extends Component {
  render() {
    return (
      <div className="home-view">
        <div>
          home view (change HomeView.js and the count should not be reset)
        </div>
        <TestView />
      </div>
    )
  }
}

export default HomeView
