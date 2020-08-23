import React, { useEffect, forwardRef } from "react"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import { useForm, Controller } from "react-hook-form"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Slide,
  MenuItem,
} from "@material-ui/core"

import { useFirebase } from "../../firebase"
import { Task } from "../../models"

const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
  },
  due: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const TaskForm = ({
  title = "Add task",
  task = { ...Task },
  editMode = false,
  open,
  handleClose,
}) => {
  const firebase = useFirebase()
  const [values, loading, error] = useCollectionOnce(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/lists`),
    {}
  )

  const { register, handleSubmit, reset, control, errors } = useForm({
    defaultValues: {
      ...task,
    },
  })
  const classes = useStyles()

  useEffect(() => {
    if (!values) return
  }, [loading, values])

  const onClose = () => {
    handleClose()
    reset()
  }

  const onSubmit = data => {
    if (editMode) {
      console.log("Edit", data)
    } else {
      firebase.createTask({ ...data })
    }
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
      <DialogTitle id="addTask">{title}</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
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
          />

          <div className={classes.due}>
            <Controller
              as={
                <TextField
                  fullWidth
                  id="list"
                  label="List"
                  name="list"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  select
                  inputRef={register}
                >
                  <MenuItem value={"Inbox"}>Inbox</MenuItem>
                  {values
                    ? values.docs.map(doc => {
                        const docData = doc.data()
                        // TODO: Add styles
                        return (
                          <MenuItem key={doc.id} value={doc.id}>
                            {`${docData.listIcon.native} ${docData.title}`}
                          </MenuItem>
                        )
                      })
                    : null}
                </TextField>
              }
              control={control}
              name="project"
            />

            <TextField
              id="dueDate"
              label="Due date"
              name="dueDate"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              inputRef={register}
            />

            <TextField
              id="remind"
              label="Remind At"
              name="remindAt"
              type="time"
              fullWidth
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
