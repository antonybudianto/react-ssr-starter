import React from 'react'
import { Helmet } from 'react-helmet'

import RouterStatus from '../../components/RouterStatus'
import './NotFoundPage.scss'

const NotFoundPage = () => (
  <RouterStatus code={404}>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="not-found-page">Sorry, Page Not found</div>
  </RouterStatus>
)

export default NotFoundPage
