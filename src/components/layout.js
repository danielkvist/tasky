import React from "react"
import firebase from "firebase/app"
import { useAuthState } from "react-firebase-hooks/auth"

import SEO from "../components/seo"
import { AuthenticatedAppBar, UnauthenticatedAppBar } from "./appbars"

const Layout = ({ title, children }) => {
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth())

  return (
    <>
      <SEO title={title} />

      <header>
        {user ? <AuthenticatedAppBar /> : <UnauthenticatedAppBar />}
      </header>
      <main>{children}</main>
    </>
  )
}

export default Layout
