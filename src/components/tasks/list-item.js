import React, { useState } from "react"
import moment from "moment"
import { red } from "@material-ui/core/colors"
import {
  IconButton,
  ListItem as MaterialListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Slide,
  makeStyles,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import StarIcon from "@material-ui/icons/Star"
import StartBorder from "@material-ui/icons/StarBorder"

const repeatedTaskDate = (oldDate, repeatEach) => {
  if (repeatEach === "Repeat every day") {
    return moment(oldDate.toDate()).add(1, "d").toDate()
  } else if (repeatEach === "Repeat every week") {
    return moment(oldDate.toDate()).add(1, "w").toDate()
  } else if (repeatEach === "Repeat every month") {
    return moment(oldDate.toDate()).add(1, "M").toDate()
  } else if (repeatEach === "Repeat every year") {
    return moment(oldDate.toDate()).add(1, "y").toDate()
  }
}

const useStyles = makeStyles(theme => ({
  itemDone: {
    background: `linear-gradient(90deg, ${red[400]} 0.5%, transparent 0.5%)`,
  },
}))

const ListItem = ({
  task,
  showDone,
  handleClick,
  handleRepeat,
  handleUpdate,
  handleDelete,
}) => {
  const [done, setDone] = useState(task.done)
  const classes = useStyles()
  const transitionDuration = 500

  let dueDate = 0
  if (task.dueDate) {
    dueDate = moment(task.dueDate.toDate()).format("MM/DD/YYYY")
  }

  const taskSubtitle = `${task.dueDate ? `Due ${dueDate}` : ""} ${
    task.dueDate && task.remindAt ? " at " : ""
  } ${task.remindAt ? `${task.remindAt}` : ""} ${
    task.repeat && task.repeat !== "Never repeat" ? ` - ${task.repeat}` : ""
  }`

  return (
    <Slide
      direction="left"
      in={showDone || !done}
      timeout={transitionDuration}
      mountOnEnter
    >
      <MaterialListItem
        key={task.id}
        className={
          moment(dueDate).isBefore(moment().format("MM/DD/YYYY"))
            ? classes.itemDone
            : null
        }
        button
      >
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

                  if (task.repeat && task.repear !== "Never repeat") {
                    handleRepeat({
                      ...task,
                      done: false,
                      dueDate: repeatedTaskDate(task.dueDate, task.repeat),
                    })
                  }
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
