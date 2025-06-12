import { FC, PropsWithChildren } from "react";

const Layout:FC<PropsWithChildren>=props=>{
  return <>layout{props.children}</>
}
export default Layout