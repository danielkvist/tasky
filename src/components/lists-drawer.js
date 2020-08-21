import React, { useState, useEffect } from "react"
import { useRecoilState } from "recoil"
import { useCollection } from "react-firebase-hooks/firestore"
import { navigate } from "gatsby"
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import AddIcon from "@material-ui/icons/Add"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import ListIcon from "@material-ui/icons/List"
import SettingsIcon from "@material-ui/icons/Settings"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import TodayIcon from "@material-ui/icons/Today"
import ViewWeekIcon from "@material-ui/icons/ViewWeek"
import WbSunnyIcon from "@material-ui/icons/WbSunny"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { useFirebase } from "../firebase"
import { tasksFilters, filterTasksBy } from "../filters/tasks"
import { ListForm } from "./forms"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  separator: {
    marginTop: "auto",
  },
}))

const ListsDrawer = ({ open, handleDrawerClose }) => {
  const firebase = useFirebase()
  const [filter, setFilter] = useRecoilState(filterTasksBy)
  const [listFormOpen, setListForm] = useState(false)
  const [values, loading, error] = useCollection(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/lists`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    if (!values) return
  }, [loading, values])

  const handleListFormOpen = () => setListForm(true)
  const handleListFormClose = () => setListForm(false)

  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>

      <Divider />

      <List>
        <ListItem button onClick={() => setFilter(tasksFilters.inbox)}>
          <ListItemIcon>
            <InboxIcon
              color={filter === tasksFilters.inbox ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        <ListItem button onClick={() => setFilter(tasksFilters.important)}>
          <ListItemIcon>
            <StarBorderIcon
              color={filter === tasksFilters.important ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Important" />
        </ListItem>

        <ListItem button onClick={() => setFilter(tasksFilters.noCompleted)}>
          <ListItemIcon>
            <ListIcon
              color={
                filter === tasksFilters.noCompleted ? "primary" : "inherit"
              }
            />
          </ListItemIcon>
          <ListItemText primary="All tasks" />
        </ListItem>

        <ListItem button onClick={() => setFilter(tasksFilters.today)}>
          <ListItemIcon>
            <TodayIcon
              color={filter === tasksFilters.today ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>

        <ListItem button onClick={() => setFilter(tasksFilters.tomorrow)}>
          <ListItemIcon>
            <WbSunnyIcon
              color={filter === tasksFilters.tomorrow ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Tomorrow" />
        </ListItem>

        <ListItem button onClick={() => setFilter(tasksFilters.week)}>
          <ListItemIcon>
            <ViewWeekIcon
              color={filter === tasksFilters.week ? "primary" : "inherit"}
            />
          </ListItemIcon>
          <ListItemText primary="Week" />
        </ListItem>
      </List>

      <Divider />

      <ListForm open={listFormOpen} handleClose={handleListFormClose} />
      <List>
        <ListItem button onClick={handleListFormOpen}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add list" />
        </ListItem>
        {values
          ? values.docs.map(doc => {
              const data = doc.data()
              return (
                <ListItem key={doc.id} button onClick={() => {}}>
                  <ListItemIcon>
                    <Typography align="left" component="p">
                      {data.listIcon.native}
                    </Typography>
                  </ListItemIcon>

                  <ListItemText primary={data.title} />

                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit">
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })
          : null}
      </List>

      <div className={classes.separator}></div>

      <Divider />

      <List>
        <ListItem button onClick={() => navigate("/account/settings/")}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        <ListItem button onClick={() => firebase.logout()}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default ListsDrawer
