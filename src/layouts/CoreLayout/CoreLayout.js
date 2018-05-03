import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

import renderRoutes from '../../routes'

import './CoreLayout.scss'

class CoreLayout extends Component {
  render() {
    return (
      <div className="container text-center">
        <Helmet>
          <title>React App</title>
          <meta name="title" content="React App" />
          <meta name="description" content="React App" />
          <meta property="og:title" content="React App" />
          <meta property="og:description" content="React App" />
        </Helmet>
        <div className="core-layout__viewport">{renderRoutes()}</div>
      </div>
    )
  }
}

export default CoreLayout
