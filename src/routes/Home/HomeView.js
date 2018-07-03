import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { toggleLogin } from '../../reducers/user'
import './HomeView.scss'
import TestView from './TestView'

class HomeView extends Component {
  static propTypes = {
    user: PropTypes.object,
    toggleLogin: PropTypes.func
  }

  render() {
    return (
      <div className="home-view">
        <div>
          home view (change HomeView.js and the count should not be reset)
        </div>
        <div>
          user: {this.props.user.isLoggedIn ? 'loggedIn' : 'notLoggedIn'}
        </div>
        <div>
          <button onClick={this.props.toggleLogin}>toggle login</button>
        </div>
        <TestView />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = {
  toggleLogin
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView)
