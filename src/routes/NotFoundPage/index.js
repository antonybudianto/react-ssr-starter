// import NotFoundPage from './NotFoundPage'
import loadable from 'loadable-components'

const NotFoundPage = loadable(() => import('./NotFoundPage'))

export default {
  path: '**',
  component: NotFoundPage
}
