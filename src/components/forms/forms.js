import React from "react"
import { useRecoilState } from "recoil"
import { useTheme, useMediaQuery } from "@material-ui/core"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

import {
  isAddListFormOpen,
  isAddTaskFormOpen,
  isEditListFormOpen,
  isEditTaskFormOpen,
} from "../../atoms/forms"
import {
  AddTaskForm,
  AddListForm,
  EditTaskForm,
  EditListForm,
} from "../../components/forms"

const Forms = () => {
  const [addTask, setAddTask] = useRecoilState(isAddTaskFormOpen)
  const [addList, setAddList] = useRecoilState(isAddListFormOpen)
  const [editTask, setEditTask] = useRecoilState(isEditTaskFormOpen)
  const [editList, setEditList] = useRecoilState(isEditListFormOpen)

  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"))

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AddTaskForm
          open={addTask}
          handleClose={() => setAddTask(false)}
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
        open={addList}
        handleClose={() => setAddList(false)}
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
