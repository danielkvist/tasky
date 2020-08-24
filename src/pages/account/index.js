import React from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

import { useFirebase } from "../../firebase"
import { LoginLayout } from "../../components/layouts"
import {
  openAddTaskForm,
  openAddListForm,
  taskToEdit,
  listToEdit,
} from "../../atoms/forms"
import {
  AddTaskForm,
  AddListForm,
  EditTaskForm,
  EditListForm,
} from "../../components/forms"
import TaskList from "../../components/tasks-list"
import { AddTaskButton } from "../../components/buttons"

const AccountPage = () => {
  const firebase = useFirebase()
  const [taskForm, setTaskForm] = useRecoilState(openAddTaskForm)
  const [listForm, setListForm] = useRecoilState(openAddListForm)
  const [editTask, setEditTask] = useRecoilState(taskToEdit)
  const [editList, setEditList] = useRecoilState(listToEdit)

  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <LoginLayout title="Account">
      {
        // TODO: Refactor into its own component
      }
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddTaskForm open={taskForm} handleClose={() => setTaskForm(false)} />
        <EditTaskForm
          open={Object.keys(editTask).length > 0}
          task={editTask}
          handleClose={() => setEditTask({})}
        />
      </MuiPickersUtilsProvider>

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
