import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import moment from "moment"
import { makeStyles } from "@material-ui/core/styles"
import { Typography, CircularProgress, List } from "@material-ui/core"
import { useCollection } from "react-firebase-hooks/firestore"

import { useFirebase } from "../firebase"
import { tasksFilters, filterTasksBy, selectedProject } from "../atoms/filters"
import { taskToEdit } from "../atoms/forms"
import Task from "../models/tasks"
import TaskItem from "./task-item"

const useStyles = makeStyles({
  container: {
    padding: 16,
  },
})

const TaskList = () => {
  const firebase = useFirebase()
  const [filter] = useRecoilState(filterTasksBy)
  const [project] = useRecoilState(selectedProject)
  const [editTask, setEditTask] = useRecoilState(taskToEdit)
  const [tasks, setTasks] = useState([])
  const [values, loading, error] = useCollection(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/tasks`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  useEffect(() => {
    if (!values) return

    // TODO: Refactor
    if (filter === tasksFilters.important) {
      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (docData.important) {
            return { ...Task, id: doc.id, ...doc.data() }
          }
        })
      )
    } else if (filter === tasksFilters.today) {
      const today = moment()

      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (
            docData.dueDate &&
            moment(docData.dueDate.toDate()).isSame(today, "day")
          ) {
            return { ...Task, id: doc.id, ...doc.data() }
          }
        })
      )
    } else if (filter === tasksFilters.tomorrow) {
      const tomorrow = moment().add(1, "day")

      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (
            docData.dueDate &&
            moment(docData.dueDate.toDate()).isSame(tomorrow, "day")
          ) {
            return { ...Task, id: doc.id, ...doc.data() }
          }
        })
      )
    } else if (filter === tasksFilters.week) {
      const week = moment()

      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (
            docData.dueDate &&
            moment(docData.dueDate.toDate()).isSame(week, "week")
          ) {
            return { ...Task, id: doc.id, ...doc.data() }
          }
        })
      )
    } else if (filter === tasksFilters.project) {
      setTasks(
        values.docs.map(doc => {
          const docData = doc.data()
          if (docData.project === project) {
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
  }, [loading, values, filter, project])

  const classes = useStyles()

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "20vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div
        style={{
          width: "100%",
          height: "20vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Error
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {tasks.length <= 0 ? (
        <div
          style={{
            width: "100%",
            height: "20vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography variant="h6" color="primary">
            Empty list
          </Typography>
        </div>
      ) : (
        <List>
          {tasks.map(item => {
            if (!item) return null
            return (
              <TaskItem
                key={item.id}
                task={item}
                handleClick={task => setEditTask(task)}
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
