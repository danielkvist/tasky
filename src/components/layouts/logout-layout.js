import React from "react"

import SEO from "../seo"

const LogoutLayout = ({ title, children }) => {
  return (
    <>
      <SEO title={title} />
      <main>{children}</main>
    </>
  )
}

export default LogoutLayout
