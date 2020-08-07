import React from "react"

import SEO from "../seo"
import { LogoutAppbar } from "../appbars"

const LogoutLayout = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />

      <header>
        <LogoutAppbar />
      </header>
      <main>{children}</main>
    </>
  )
}

export default LogoutLayout
