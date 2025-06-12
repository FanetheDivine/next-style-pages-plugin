import { FC, PropsWithChildren } from "react";

const Layout:FC<PropsWithChildren>=props=>{
  return <>content{props.children}</>
}
export default Layout