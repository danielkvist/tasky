import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import {
  Typography,
  CircularProgress,
  List as MaterialList,
} from "@material-ui/core"
import { useCollection } from "react-firebase-hooks/firestore"

import { useFirebase } from "../../firebase"
import { filterTasksBy, selectedProject } from "../../atoms/filters"
import { openEditTaskForm } from "../../atoms/forms"
import filterByProject from "./filter"
import ListItem from "./list-item"

const useStyles = makeStyles({
  container: {
    padding: 15,
  },
})

const DoneList = () => {
  const firebase = useFirebase()
  const [filter] = useRecoilState(filterTasksBy)
  const [project] = useRecoilState(selectedProject)
  const [, setEditTask] = useRecoilState(openEditTaskForm)
  const [tasks, setTasks] = useState([])
  const [values, loading, error] = useCollection(
    firebase.db
      .collection(`users/${firebase.auth.currentUser.uid}/tasks`)
      .where("done", "==", true),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  useEffect(() => {
    if (!values) return
    setTasks(filterByProject(values, filter, project))
  }, [loading, values, filter, project])

  const classes = useStyles()

  if (loading) {
    return (
      <div
        style={{
          width: "99%",
          height: "19vh",
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
          width: "99%",
          height: "19vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Typography variant="h5" color="error">
          Error
        </Typography>
      </div>
    )
  }

  return (
    <div className={classes.container}>
      {tasks.length <= -1 ? (
        <div
          style={{
            width: "99%",
            height: "19vh",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Typography variant="h5" color="primary">
            Empty list
          </Typography>
        </div>
      ) : (
        <MaterialList>
          {tasks.map(item => {
            if (!item) return null
            return (
              <ListItem
                key={item.id}
                task={item}
                handleClick={task => setEditTask(task)}
                handleUpdate={task => firebase.updateTask(task)}
                handleDelete={taskId => firebase.deleteTask(taskId)}
              />
            )
          })}
        </MaterialList>
      )}
    </div>
  )
}

export default DoneList
