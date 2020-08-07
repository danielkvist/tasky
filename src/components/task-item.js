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

import { useFirebase } from "../firebase"

const TaskItem = ({ task }) => {
  const firebase = useFirebase()

  return (
    <ListItem key={task.id} button>
      <ListItemIcon>
        {task.done ? (
          <CheckCircleIcon color="primary" />
        ) : (
          <RadioButtonUncheckedIcon color="primary" />
        )}
      </ListItemIcon>

      <ListItemText primary={task.title} />

      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => {
            firebase.deleteTask(task.id)
          }}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}

export default TaskItem
