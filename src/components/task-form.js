import React, { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
} from "@material-ui/core"

import { useFirebase } from "../firebase"

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  dueDate: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const TaskForm = ({ open, handleClose }) => {
  const firebase = useFirebase()
  const { register, handleSubmit, reset, errors } = useForm()
  const classes = useStyles()

  const onClose = () => {
    handleClose()
    reset()
  }

  const onSubmit = data => {
    firebase.createTask({ ...data })
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="Add task"
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="addTask">Add Task</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            defaultValue=""
            error={!!errors.title}
            fullWidth
            helperText={errors.title ? "Task title is required" : ""}
            id="title"
            inputRef={register({
              required: true,
            })}
            label="Title"
            margin="dense"
            name="title"
            required
            type="text"
          />
          <TextField
            fullWidth
            id="description"
            label="Description"
            multiline
            name="description"
            inputRef={register}
            type="text"
            defaultValue=""
          />

          <div className={classes.dueDate}>
            <TextField
              id="dueDate"
              label="Due date"
              name="dueDate"
              type="date"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={register}
            />
            <TextField
              id="remind"
              label="Remind At"
              name="remind"
              type="time"
              defaultValue=""
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300,
              }}
              inputRef={register}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskForm
