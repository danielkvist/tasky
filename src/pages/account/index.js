import React from "react"
import { navigate } from "gatsby"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../../firebase"
import { LoginLayout } from "../../components/layouts"
import List from "../../components/tasks"
import Forms from "../../components/forms"
import { AddTaskButton } from "../../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()

  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <LoginLayout title="Account">
      <Forms />
      <List />
      <AddTaskButton />
    </LoginLayout>
  )
}

export default AccountPage
