import React from "react"
import { useRecoilState } from "recoil"
import { useTheme, useMediaQuery } from "@material-ui/core"
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

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddTaskForm
          open={taskForm}
          handleClose={() => setTaskForm(false)}
          mobile={!matches}
        />
        <EditTaskForm
          open={Object.keys(editTask).length > 0}
          task={editTask}
          handleClose={() => setEditTask({})}
          mobile={!matches}
        />
      </MuiPickersUtilsProvider>
      <AddListForm
        open={listForm}
        handleClose={() => setListForm(false)}
        mobile={!matches}
      />
      <EditListForm
        open={Object.keys(editList).length > 0}
        list={editList}
        handleClose={() => setEditList({})}
        mobile={!matches}
      />
    </>
  )
}

export default Forms
