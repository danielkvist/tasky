import React from "react"
import { navigate } from "gatsby"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../firebase"
import Layout from "../components/layout"
import { AddTaskButton } from "../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <Layout title="Account">
      <AddTaskButton />
    </Layout>
  )
}

export default AccountPage
