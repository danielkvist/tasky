import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../../firebase"
import { LoginLayout } from "../../components/layouts"
import { openAddTaskForm, openAddListForm, listToEdit } from "../../atoms/forms"
import { TaskForm, AddListForm, EditListForm } from "../../components/forms"
import TaskList from "../../components/tasks-list"
import { AddTaskButton } from "../../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  const [taskForm, setTaskForm] = useRecoilState(openAddTaskForm)
  const [listForm, setListForm] = useRecoilState(openAddListForm)
  const [editList, setEditList] = useRecoilState(listToEdit)

  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <LoginLayout title="Account">
      <TaskForm open={taskForm} handleClose={() => setTaskForm(false)} />
      <AddListForm open={listForm} handleClose={() => setListForm(false)} />
      <EditListForm
        open={Object.keys(editList).length > 0}
        list={editList}
        handleClose={() => setEditList({})}
      />
      <TaskList />
      <AddTaskButton />
    </LoginLayout>
  )
}

export default AccountPage
