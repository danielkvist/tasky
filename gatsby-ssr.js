import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import "normalize.css"

import Firebase, { FirebaseCtx, useFirebase } from "./src/firebase"

const SessionCheck = ({ children }) => {
  const firebase = useFirebase()
  const [, loading, error] = useAuthState(firebase.auth)

  // TODO: Error page
  if (error) return <h1>Error!</h1>
  return !loading ? <>{children}</> : <></>
}

export const wrapRootElement = ({ element }) => {
  return (
    <FirebaseCtx.Provider value={new Firebase()}>
      <SessionCheck>{element}</SessionCheck>
    </FirebaseCtx.Provider>
  )
}
