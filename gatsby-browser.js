import React from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import "normalize.css"

import Firebase, { FirebaseCtx, useFirebase } from "./src/firebase"

const SessionCheck = ({ children }) => {
  const firebase = useFirebase()
  const [, loading, error] = useAuthState(firebase.auth)

  // TODO: Error page
  if (error) return <h1>Error!</h1>

  // return Index if user is not logger
  // return App if user is logged
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
      <SessionCheck>{element}</SessionCheck>
    </FirebaseCtx.Provider>
  )
}
