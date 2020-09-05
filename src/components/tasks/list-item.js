import React, { useState } from "react"
import moment from "moment"
import {
  IconButton,
  ListItem as MaterialListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Slide,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import StarIcon from "@material-ui/icons/Star"
import StartBorder from "@material-ui/icons/StarBorder"

const ListItem = ({
  task,
  showDone,
  handleClick,
  handleUpdate,
  handleDelete,
}) => {
  const [done, setDone] = useState(task.done)
  const transitionDuration = 500

  let dueDate = 0
  if (task.dueDate) {
    dueDate = moment(task.dueDate.toDate()).format("MM/DD/YYYY")
  }

  const taskSubtitle = `${task.dueDate ? `Due ${dueDate}` : ""} ${
    task.dueDate && task.remindAt ? " at " : ""
  } ${task.remindAt ? `${task.remindAt}` : ""}`

  return (
    <Slide
      direction="left"
      in={showDone || !done}
      timeout={transitionDuration}
      mountOnEnter
    >
      <MaterialListItem key={task.id} button>
        <ListItemIcon>
          {task.done ? (
            <IconButton
              edge="start"
              arial-label="Mark task as undone"
              onClick={() => {
                setDone(false)
                setTimeout(() => {
                  handleUpdate({ ...task, done: false })
                }, transitionDuration)
              }}
            >
              <CheckCircleIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              arial-label="Mark task as done"
              onClick={() => {
                setDone(true)
                setTimeout(() => {
                  handleUpdate({ ...task, done: true })
                }, transitionDuration)
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
    </Slide>
  )
}

export default ListItem
