import React from "react"
import { navigate } from "gatsby"
import clsx from "clsx"
import {
  Divider,
  Drawer,
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
import InboxIcon from "@material-ui/icons/MoveToInbox"
import ListIcon from "@material-ui/icons/List"
import SettingsIcon from "@material-ui/icons/Settings"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import TodayIcon from "@material-ui/icons/Today"
import ViewWeekIcon from "@material-ui/icons/ViewWeek"
import WbSunnyIcon from "@material-ui/icons/WbSunny"

import { useFirebase } from "../firebase"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
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
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
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
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <ListItemText primary="Important" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="All tasks" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <TodayIcon />
          </ListItemIcon>
          <ListItemText primary="Today" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Tomorrow" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ViewWeekIcon />
          </ListItemIcon>
          <ListItemText primary="Week" />
        </ListItem>
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
