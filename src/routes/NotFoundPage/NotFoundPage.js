import React from 'react'
import { Helmet } from 'react-helmet'

import RouterStatus from '../../components/RouterStatus'

const NotFoundPage = () => (
  <RouterStatus code={404}>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div>
      Sorry, Page Not found
    </div>
  </RouterStatus>
)

export default NotFoundPage
