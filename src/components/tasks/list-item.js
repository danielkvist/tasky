import React from "react"
import moment from "moment"
import {
  IconButton,
  ListItem as MaterialListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import StarIcon from "@material-ui/icons/Star"
import StartBorder from "@material-ui/icons/StarBorder"

const ListItem = ({ task, handleClick, handleUpdate, handleDelete }) => {
  let dueDate = 0
  if (task.dueDate) {
    dueDate = moment(task.dueDate.toDate()).format("MM/DD/YYYY")
  }
  const taskSubtitle = `${task.dueDate ? `Due ${dueDate}` : ""} ${
    task.dueDate && task.remindAt ? " at " : ""
  } ${task.remindAt ? `${task.remindAt}` : ""}`

  return (
    <MaterialListItem key={task.id} button>
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

      <ListItemText
        primary={task.title}
        secondary={taskSubtitle}
        onClick={() => handleClick({ ...task })}
        style={{ textDecoration: `${task.done && "line-through"}` }}
      />

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
    </MaterialListItem>
  )
}

export default ListItem
