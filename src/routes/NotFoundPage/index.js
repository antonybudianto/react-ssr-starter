// import NotFoundPage from './NotFoundPage'
import loadable from "@loadable/component"

const NotFoundPage = loadable(() => import("./NotFoundPage"))

export default NotFoundPage
