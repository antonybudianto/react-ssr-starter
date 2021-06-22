import React, { Component } from "react"
import PropTypes from "prop-types"

import "./HomeView.css"

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func
  }

  render() {
    return (
      <div className="home-view">
        <div>home 123</div>
      </div>
    )
  }
}

export default HomeView
