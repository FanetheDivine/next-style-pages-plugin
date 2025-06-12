import { useRoutes } from 'react-router'
import routeMap from '~pages'
import { createReactRoutes } from './next-style-pages-plugin'

export const App = () => {
  const routes = createReactRoutes(routeMap)
  const router = useRoutes(routes)
  return router
}
