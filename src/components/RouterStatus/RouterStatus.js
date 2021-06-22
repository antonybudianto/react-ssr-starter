import React from "react"
import { Route } from "react-router-dom"
import PropTypes from "prop-types"

const RouterStatus = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

RouterStatus.propTypes = {
  code: PropTypes.number,
  children: PropTypes.node
}

export default RouterStatus
