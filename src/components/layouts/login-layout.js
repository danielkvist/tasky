import React from "react"

import SEO from "../seo"
import { LoginAppbar } from "../appbars"

const LoginLayout = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />

      <header>
        <LoginAppbar />
      </header>
      <main>{children}</main>
    </>
  )
}

export default LoginLayout
