import React from "react"
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"

const TaskItem = ({ task, handleDone, handleDelete }) => {
  return (
    <ListItem key={task.id} button onClick={() => console.log(task)}>
      <ListItemIcon>
        {task.done ? (
          <IconButton
            edge="start"
            arial-label="Mark task as undone"
            onClick={() => {
              handleDone({ ...task, done: false })
            }}
          >
            <CheckCircleIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            arial-label="Mark task as done"
            onClick={() => {
              handleDone({ ...task, done: true })
            }}
          >
            <RadioButtonUncheckedIcon color="primary" />
          </IconButton>
        )}
      </ListItemIcon>

      <ListItemText primary={task.title} />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            handleDelete(task.id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TaskItem
