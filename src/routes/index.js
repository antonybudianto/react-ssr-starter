import React from 'react'
import { renderRoutes, matchRoutes } from 'react-router-config'
import { UAParser } from 'ua-parser-js'

import HomeView from './Home'
import NotFoundPage from './NotFoundPage'
// import { fetchUser } from '../reducers/user'
import { initUserAgent } from '../reducers/user-agent'

const routes = [{ ...HomeView }, { ...NotFoundPage }]

export const getInitialData = (req, store) => {
  const path = req.path
  const ua = new UAParser(req.headers['user-agent']).getResult()
  store.dispatch(initUserAgent(ua))
  return matchRoutes(routes, path).map(({ route }) => {
    const promises = []
    // if (route.auth) {
    //   promises.push(store.dispatch(fetchUser(store.cookies)))
    // }
    if (route.loadData) {
      promises.push(route.loadData(store, req))
    }
    return Promise.all(promises)
  })
}

export default () => {
  return <div>{renderRoutes(routes)}</div>
}
