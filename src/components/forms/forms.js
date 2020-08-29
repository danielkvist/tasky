import React from "react"
import { useRecoilState } from "recoil"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

import {
  openAddTaskForm,
  openAddListForm,
  openEditTaskForm,
  openEditListForm,
} from "../../atoms/forms"
import {
  AddTaskForm,
  AddListForm,
  EditTaskForm,
  EditListForm,
} from "../../components/forms"

const Forms = () => {
  const [taskForm, setTaskForm] = useRecoilState(openAddTaskForm)
  const [listForm, setListForm] = useRecoilState(openAddListForm)
  const [editTask, setEditTask] = useRecoilState(openEditTaskForm)
  const [editList, setEditList] = useRecoilState(openEditListForm)

  return (
    <>
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
    </>
  )
}

export default Forms
