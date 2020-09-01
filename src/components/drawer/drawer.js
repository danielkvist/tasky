import React from "react"
import { useRecoilState } from "recoil"
import { navigate } from "gatsby"
import {
  Divider,
  Drawer as MaterialDrawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  useTheme,
} from "@material-ui/core"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import SettingsIcon from "@material-ui/icons/Settings"

import { useFirebase } from "../../firebase"
import { openAddListForm } from "../../atoms/forms"
import Avatar from "./avatar"
import MainFiltersList from "./main-filters"
import ProjectFiltersList from "./project-filters"

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

const Drawer = ({ open, handleClose }) => {
  const firebase = useFirebase()
  const [, setListForm] = useRecoilState(openAddListForm)

  const classes = useStyles()
  const theme = useTheme()

  return (
    <MaterialDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>

      <Divider />

      <div>
        <Avatar alt={firebase.currentUser} filename="fenix/03.png" />
      </div>

      <Divider />

      <MainFiltersList />

      <Divider />

      <ProjectFiltersList handleListFormOpen={() => setListForm(true)} />

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
    </MaterialDrawer>
  )
}

export default Drawer
