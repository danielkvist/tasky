import React from "react"

import { isAuthenticated } from "../utils/auth"
import SEO from "../components/seo"
import { AuthenticatedAppBar, UnauthenticatedAppBar } from "./appbars"

const Layout = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />

      <header>
        {isAuthenticated() ? (
          <AuthenticatedAppBar />
        ) : (
          <UnauthenticatedAppBar />
        )}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
