import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../../firebase"
import { showDoneTasks } from "../../atoms/filters"
import { LoginLayout } from "../../components/layouts"
import { List, DoneList } from "../../components/tasks"
import Forms from "../../components/forms"
import { AddTaskButton } from "../../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  const [showDone] = useRecoilState(showDoneTasks)

  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <LoginLayout title="Account">
      <Forms />
      <List />
      {showDone ? <DoneList /> : null}
      <AddTaskButton />
    </LoginLayout>
  )
}

export default AccountPage
