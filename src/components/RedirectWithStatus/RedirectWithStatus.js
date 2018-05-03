import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) {
        staticContext.status = status
      }
      return <Redirect from={from} to={to} />
    }}
  />
)

RedirectWithStatus.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  status: PropTypes.number
}

export default RedirectWithStatus
