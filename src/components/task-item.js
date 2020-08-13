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
import StarIcon from "@material-ui/icons/Star"
import StartBorder from "@material-ui/icons/StarBorder"

const TaskItem = ({ task, handleUpdate, handleDelete }) => {
  return (
    <ListItem key={task.id} button>
      <ListItemIcon>
        {task.done ? (
          <IconButton
            edge="start"
            arial-label="Mark task as undone"
            onClick={() => {
              handleUpdate({ ...task, done: false })
            }}
          >
            <CheckCircleIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            arial-label="Mark task as done"
            onClick={() => {
              handleUpdate({ ...task, done: true })
            }}
          >
            <RadioButtonUncheckedIcon color="primary" />
          </IconButton>
        )}
      </ListItemIcon>

      <ListItemText primary={task.title} />

      <ListItemSecondaryAction>
        {task.important ? (
          <IconButton
            edge="end"
            aria-label="Mark off as important"
            onClick={() => {
              handleUpdate({ ...task, important: false })
            }}
          >
            <StarIcon />
          </IconButton>
        ) : (
          <IconButton
            edge="end"
            aria-label="Mark as important"
            onClick={() => {
              handleUpdate({ ...task, important: true })
            }}
          >
            <StartBorder />
          </IconButton>
        )}

        <IconButton
          edge="end"
          aria-label="Delete task"
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
