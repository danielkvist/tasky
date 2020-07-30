import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

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

const AddTaskButton = ({ cb = () => {} }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Fab color="primary" aria-label="Add task" onClick={e => cb(e)}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default AddTaskButton
