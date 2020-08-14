import React from "react"
import { ThemeProvider } from "@material-ui/core/styles"
import { useAuthState } from "react-firebase-hooks/auth"
import "normalize.css"

import Firebase, { FirebaseCtx, useFirebase } from "./src/firebase"
import theme from "./src/themes/main"

const SessionCheck = ({ children }) => {
  const firebase = useFirebase()
  const [user, loading, error] = useAuthState(firebase.auth)

  // TODO: Error page
  if (error) return <h1>Error!</h1>

  if (user) firebase.currentUser = user.uid

  // TODO: display loading component
  return !loading ? <>{children}</> : <></>
}

export const wrapRootElement = ({ element }) => {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }

  return (
    <FirebaseCtx.Provider value={new Firebase(config)}>
      <ThemeProvider theme={theme}>
        <SessionCheck>{element}</SessionCheck>
      </ThemeProvider>
    </FirebaseCtx.Provider>
  )
}
