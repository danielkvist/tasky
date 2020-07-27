import React, { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import "normalize.css"

import { silentAuth } from "./src/utils/auth"
import Theme from "./src/theme/theme"
import GlobalStyle from "./src/theme/global-style"

const SessionCheck = ({ children }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    silentAuth(() => {
      setLoading(false)
    })
  })

  return loading === false ? <>{children}</> : <></>
}

export const wrapRootElement = ({ element }) => {
  return (
    <SessionCheck>
      <ThemeProvider theme={Theme}>
        <GlobalStyle>{element}</GlobalStyle>
      </ThemeProvider>
    </SessionCheck>
  )
}
