import React from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { Fab } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { isAddTaskFormOpen } from "../atoms/forms"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      background: `linear-gradient(95deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
    },
    bottom: 25,
    position: "absolute",
    right: 25,
  },
}))

const FabAddTask = () => {
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

export default FabAddTask
