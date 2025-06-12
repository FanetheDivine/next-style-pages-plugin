# next-style-pages-plugin

基于文件路径的路由  
在指定文件夹内构建文件结构 将文件名为`page`, `404`, `loading`, `error`, `layout`的文件按照next.js的风格组合为路由

## 使用例

将`src/next-style-pages-plugin`复制在项目中并安装依赖`vite-plugin-pages`

```ts
// vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { CustomPagesPlugin } from './src/next-style-pages-plugin'

export default defineConfig({
  plugins: [CustomPagesPlugin(), react()],
  define: {
    'process.env': process.env,
  },
})
```

```ts
// vite-env.d.ts
declare module '~pages' {
  export type { RouteMap } from '/src/next-style-pages-plugin/index.ts'
  const routeMap: RouteMap
  export default routeMap
}
```

```ts
// App.tsx
import { useRoutes } from 'react-router'
import routeMap from '~pages'
import { createReactRoutes } from './next-style-pages-plugin'

export const App = () => {
  const routes = createReactRoutes(routeMap)
  const router = useRoutes(routes)
  return router
}
```

```ts
// main.tsx
import { BrowserRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

```

## 插件参数

```ts
type CustomPagesPluginOptions = {
  /**
   * 从这个路径获取文件结构解析结果
   * @example '~react-pages'
   */
  module?: string
  /**
   * 页面文件的根目录
   * @example '/src/pages'
   */
  pageSrc?: string
  /**
   * 可被解析为路由的文件拓展名
   * @example ['tsx', 'jsx', 'ts', 'js', 'vue']
   */
  extensions?: string[]
  /**
   * lazy函数的导入语句
   * @example "import { lazy } from 'react';"
   */
  lazyImport?: string
}
```

## 实用工具

### createReactRoutes

生成react-router的路由  
需要安装`react-error-boundary` `react-router`

```ts
const createReactRoutes:(routeMap:RouteMap) => RouterObject[]
```
