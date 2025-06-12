/// <reference types="vite/client" />
declare module '~pages' {
  export type { RouteMap } from '/src/next-style-pages-plugin/index.ts'
  const routeMap: RouteMap
  export default routeMap
}
