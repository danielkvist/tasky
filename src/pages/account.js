import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../firebase"
import { showDoneTasks } from "../atoms/filters"
import { userAvatarClassState } from "../atoms/user"
import Layout from "../components/layout"
import { List, DoneList } from "../components/tasks"
import Forms from "../components/forms"
import FabAddTask from "../components/fab-add-task"

const AccountPage = () => {
  const firebase = useFirebase()
  const [showDone] = useRecoilState(showDoneTasks)
  const [userAvatar] = useRecoilState(userAvatarClassState)
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) navigate("/", { replace: true })
  if (!userAvatar) navigate("/setup/", { replace: true })

  return (
    <Layout title="Account">
      <Forms />
      <List />
      {showDone ? <DoneList /> : null}
      <FabAddTask />
    </Layout>
  )
}

export default AccountPage
