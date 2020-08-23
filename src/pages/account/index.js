import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../../firebase"
import { LoginLayout } from "../../components/layouts"
import { openAddTaskForm, openAddListForm } from "../../atoms/forms"
import { TaskForm, ListForm } from "../../components/forms"
import TaskList from "../../components/tasks-list"
import { AddTaskButton } from "../../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  const [listForm, setListForm] = useRecoilState(openAddListForm)
  const [taskForm, setTaskForm] = useRecoilState(openAddTaskForm)

  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <LoginLayout title="Account">
      <TaskForm open={taskForm} handleClose={() => setTaskForm(false)} />
      <ListForm open={listForm} handleClose={() => setListForm(false)} />
      <TaskList />
      <AddTaskButton />
    </LoginLayout>
  )
}

export default AccountPage
