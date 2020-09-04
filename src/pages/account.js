import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../firebase"
import { showDoneTasks } from "../atoms/filters"
import { userAvatarClass } from "../atoms/user"
import Layout from "../components/layouts"
import { List, DoneList } from "../components/tasks"
import Forms from "../components/forms"
import { AddTaskButton } from "../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  const [showDone] = useRecoilState(showDoneTasks)
  // const [avatar] = useRecoilState(userAvatarClass)
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  // if (!avatar) {
  //   navigate("/setup/", { replace: true })
  // }

  return (
    <Layout title="Account">
      <Forms />
      <List />
      {showDone ? <DoneList /> : null}
      <AddTaskButton />
    </Layout>
  )
}

export default AccountPage
