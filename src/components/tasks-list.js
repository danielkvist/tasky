import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, List } from "@material-ui/core"
import { useCollection } from "react-firebase-hooks/firestore"

import { useFirebase } from "../firebase"
import { tasksFilters, filterTasksBy } from "../filters/tasks"
import Task from "../models/tasks"
import TaskItem from "./task-item"

const useStyles = makeStyles({
  container: {
    marginLeft: "5rem",
    padding: 16,
  },
})

const TaskList = () => {
  const firebase = useFirebase()
  const [filter, setFilter] = useRecoilState(filterTasksBy)
  const [tasks, setTasks] = useState([])
  const [values, loading, error] = useCollection(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/tasks`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  useEffect(() => {
    if (!values) return

    if (filter === tasksFilters.important) {
      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (docData.important) {
            return { ...Task, id: doc.id, ...doc.data() }
          }
        })
      )
    } else {
      setTasks(
        values.docs.map(doc => {
          return { ...Task, id: doc.id, ...doc.data() }
        })
      )
    }
  }, [loading, values, filter])

  const classes = useStyles()

  if (loading) {
    return (
      <Typography variant="h6" color="error">
        Loading
      </Typography>
    )
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error
      </Typography>
    )
  }

  return (
    <div className={classes.container}>
      {tasks.length <= 0 ? (
        <Typography variant="h6" color="error">
          Empty list
        </Typography>
      ) : (
        <List>
          {tasks.map(item => {
            if (!item) return null
            return (
              <TaskItem
                key={item.id}
                task={item}
                handleUpdate={task => firebase.updateTask(task)}
                handleDelete={taskId => firebase.deleteTask(taskId)}
              />
            )
          })}
        </List>
      )}
    </div>
  )
}

export default TaskList
