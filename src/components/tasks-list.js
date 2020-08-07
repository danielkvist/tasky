import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Typography, List } from "@material-ui/core"
import { useCollection } from "react-firebase-hooks/firestore"

import { useFirebase } from "../firebase"
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
  const [tasks, setTasks] = useState([])
  const [values, loading, error] = useCollection(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/tasks`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  useEffect(() => {
    if (!values) return

    setTasks(
      values.docs.map(doc => {
        return { ...Task, id: doc.id, ...doc.data() }
      })
    )
  }, [loading, values])

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
    <Container className={classes.container} maxWidth="md">
      {!tasks.length ? (
        <Typography variant="h6" color="error">
          Empty list
        </Typography>
      ) : (
        <List>
          {tasks.map(item => {
            return <TaskItem key={item.id} task={item} />
          })}
        </List>
      )}
    </Container>
  )
}

export default TaskList
