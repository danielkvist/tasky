import React from "react"
import { useRecoilState } from "recoil"
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
import { isAddListFormOpen } from "../../atoms/forms"
import { isDrawerOpen } from "../../atoms/ui"
import { userAvatarClass } from "../../atoms/user"
import Avatar from "./avatar"
import MainFiltersList from "./main-filters"
import ProjectFiltersList from "./project-filters"

const useStyles = makeStyles(theme => ({
  drawer: {
    width: theme.props.drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: theme.props.drawerWidth,
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

const Drawer = () => {
  const firebase = useFirebase()
  const [, setAddList] = useRecoilState(isAddListFormOpen)
  const [open, setDrawer] = useRecoilState(isDrawerOpen)
  const [avatar] = useRecoilState(userAvatarClass)

  const classes = useStyles()
  const theme = useTheme()

  const handleDrawerClose = () => setDrawer(false)

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
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>

      <Divider />

      <div>
        <Avatar
          alt={firebase.currentUser}
          filename={`${avatar || "fenix"}/01.png`}
        />
      </div>

      <Divider />

      <MainFiltersList />

      <Divider />

      <ProjectFiltersList handleListFormOpen={() => setAddList(true)} />

      <div className={classes.separator}></div>

      <Divider />

      <List>
        <ListItem button onClick={() => {}}>
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
