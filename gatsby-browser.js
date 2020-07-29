import React, { useState, useEffect } from "react"
import "normalize.css"

import { silentAuth } from "./src/utils/auth"

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
  return <SessionCheck>{element}</SessionCheck>
}
