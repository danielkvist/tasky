import React, { useState } from "react"
import { navigate } from "gatsby"
import clsx from "clsx"
import {
  AppBar,
  Button,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import NotificationsNone from "@material-ui/icons/NotificationsNone"
import SettingsIcon from "@material-ui/icons/Settings"

import { useFirebase } from "../../firebase"
import ListsDrawer from "../lists-drawer"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  offset: theme.mixins.toolbar,
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  buttonGroup: {
    marginLeft: "auto",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
}))

const LoginAppbar = () => {
  const firebase = useFirebase()
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <>
      <nav className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tasky
            </Typography>

            <div className={classes.buttonGroup}>
              <Button color="inherit" onClick={() => firebase.logout()}>
                Log Out
              </Button>

              <IconButton aria-label="Notifications" edge="end" color="inherit">
                <NotificationsNone />
              </IconButton>

              <IconButton
                aria-label="Account settings"
                edge="end"
                color="inherit"
                onClick={() => navigate("/account/settings/")}
              >
                <SettingsIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </nav>

      <div className={classes.offset}></div>

      <ListsDrawer open={open} handleDrawerClose={() => handleDrawerClose()} />
    </>
  )
}

export default LoginAppbar
