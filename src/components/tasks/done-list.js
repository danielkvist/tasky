import React, { useState, useEffect } from "react"
import clsx from "clsx"
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
import { isEditTaskFormOpen } from "../../atoms/forms"
import { isDrawerOpen } from "../../atoms/ui"
import filterByProject from "./filter"
import ListItem from "./list-item"

const useStyles = makeStyles(theme => ({
  content: {
    padding: 15,
  },
  contentShift: {
    width: `calc(100% - ${theme.props.drawerWidth}px)`,
    marginLeft: theme.props.drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

const DoneList = () => {
  const firebase = useFirebase()
  const [filter] = useRecoilState(filterTasksBy)
  const [project] = useRecoilState(selectedProject)
  const [, setEditTask] = useRecoilState(isEditTaskFormOpen)
  const [open] = useRecoilState(isDrawerOpen)
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
    <div
      className={clsx(classes.content, {
        [classes.contentShift]: open,
      })}
    >
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
