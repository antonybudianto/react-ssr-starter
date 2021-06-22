import React from "react"
import { Switch, Route } from "react-router-dom"

import HomeView from "./Home"
import NotFoundPage from "./NotFoundPage"

// eslint-disable-next-line no-unused-vars
export const getInitialData = (req, store) => {
  return []
}

export default function initRenderRoutes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route exact path="**" component={NotFoundPage} />
    </Switch>
  )
}
