import React from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { isAddTaskFormOpen } from "../../atoms/forms"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    bottom: 25,
    position: "absolute",
    right: 25,
  },
}))

const AddTaskButton = () => {
  const [, setAddTask] = useRecoilState(isAddTaskFormOpen)
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <Fab
          color="primary"
          aria-label="Add task"
          onClick={() => setAddTask(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default AddTaskButton
