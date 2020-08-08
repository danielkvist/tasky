import React, { useState, forwardRef } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Slide,
} from "@material-ui/core"
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
  form: {
    display: "flex",
    flexDirection: "column",
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const AddTaskButton = ({ cb = () => {} }) => {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const classes = useStyles()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setTitle("")
    setDescription("")
  }

  const handleSubmit = (e = null) => {
    if (e) e.preventDefault()

    if (!title) {
      return
    }

    cb({ title, description })
    handleClose()
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="Add task"
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="addTask">Add Task</DialogTitle>
        <DialogContent>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
              multiline
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.root}>
        <Fab color="primary" aria-label="Add task" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}

export default AddTaskButton
