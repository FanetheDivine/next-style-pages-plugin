import { ComponentType, ReactNode, Suspense } from 'react'
import { Outlet, RouteObject } from 'react-router'
import { ErrorBoundary } from 'react-error-boundary'
import type { RouteMap } from '..'

/**
 * 创建react-router路由
 * @example
 * ```
 * import { BrowserRouter useRoutes } from 'react-router'
 * import routeMap from '~pages'
 *
 * const App = () => useRoutes(createReactRoutes(routeMap))
 * createRoot(document.getElementById('root')!).render(<BrowserRouter><App /></BrowserRouter>)
 * ```
 */
export function createReactRoutes(
  routeMap: RouteMap,
  defaultError?: ReactNode,
  defaultLoading?: ReactNode,
): RouteObject[] {
  function convertRouteMap(routeMap?: RouteMap): RouteObject[] | undefined {
    if (!routeMap || routeMap.length === 0) return undefined
    const res: RouteObject[] = routeMap.map(function (item): RouteObject {
      const Component = createComboComp(
        item.components,
        defaultError,
        defaultLoading,
      )
      const element = Component ? (
        <Component>
          <Outlet></Outlet>
        </Component>
      ) : null

      if (!item.path) {
        return {
          index: true,
          element,
        }
      }
      const children = convertRouteMap(item.children)
      if (/^\(.*\)$/.test(item.path)) {
        // 形如 (withAuth) 仅提供layout包裹 不影响url
        return {
          element,
          children,
        }
      }
      return {
        path: item.path,
        element,
        children,
      }
    })
    return res
  }
  const routes = convertRouteMap(routeMap)
  return routes ?? []
}

/**
 * 做如下转换
 * [Comp1,Comp2] -> props=><Comp1><Comp2>{props.children}</Comp2><Comp1>
 * 对于key为loading的组件 使用Suspense
 * 对于key为error的组件 使用ErrorBoundary
 */
function createComboComp(
  comps?: RouteMap[number]['components'],
  defaultError?: ReactNode,
  defaultLoading?: ReactNode,
): ComponentType<any> | null {
  if (!comps || comps.length === 0) return null

  let ResultComp: ComponentType<any> | null = null
  comps.forEach((item) => {
    let CurrentComp: ComponentType<any> | null = null
    if (item.key === 'error') {
      let fallback: ReactNode | undefined = defaultError
      if (item.value) {
        const _Comp = item.value
        fallback = <_Comp />
      }
      if (fallback) {
        CurrentComp = (props) => (
          <ErrorBoundary fallback={fallback}>{props.children}</ErrorBoundary>
        )
      }
    } else if (item.key === 'loading') {
      let fallback: ReactNode | undefined = defaultLoading
      if (item.value) {
        const _Comp = item.value
        fallback = <_Comp />
      }
      if (fallback) {
        CurrentComp = (props) => (
          <Suspense fallback={fallback}>{props.children}</Suspense>
        )
      }
    } else {
      CurrentComp = item.value
    }
    if (!CurrentComp) return
    if (ResultComp) {
      const TempComp = ResultComp
      ResultComp = (props) => (
        <TempComp>
          <CurrentComp>{props.children}</CurrentComp>
        </TempComp>
      )
    } else {
      ResultComp = CurrentComp
    }
  })
  return ResultComp
}
