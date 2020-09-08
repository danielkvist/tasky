import React from "react"

import SEO from "../seo"
import AppBar from "../appbar"

const Layout = ({ title, disable = false, children }) => {
  return (
    <>
      <SEO title={title} />

      <header>
        <AppBar disable={disable} />
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
