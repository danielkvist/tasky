import React from "react"
import { navigate } from "gatsby"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../../firebase"
import { LoginLayout } from "../../components/layouts"
import TaskList from "../../components/tasks-list"
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
      <TaskList />
      <AddTaskButton
        cb={({ title, description }) =>
          firebase.createTask({ title, description })
        }
      />
    </LoginLayout>
  )
}

export default AccountPage
