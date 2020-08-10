import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import TaskForm from "../task-form"

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
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <TaskForm open={open} handleClose={handleClose} />
      <div className={classes.root}>
        <Fab color="primary" aria-label="Add task" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default AddTaskButton
