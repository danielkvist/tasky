import React, { useState } from "react"
import clsx from "clsx"
import {
  AppBar,
  CssBaseline,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import VisibilityIcon from "@material-ui/icons/Visibility"
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff"
import NotificationsNone from "@material-ui/icons/NotificationsNone"

import Drawer from "../drawer"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  offset: theme.mixins.toolbar,
  buttonGroup: {
    marginLeft: "auto",
  },
}))

const LoginAppbar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  //TODO: Fix
  const [showDone, setShowDone] = useState(false)

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
              onClick={() => setOpen(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Tasky
            </Typography>

            <div className={classes.buttonGroup}>
              <IconButton
                aria-label="Display done"
                edge="end"
                color="inherit"
                onClick={() => setShowDone(!showDone)}
              >
                {showDone ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
              <IconButton aria-label="Notifications" edge="end" color="inherit">
                <NotificationsNone />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </nav>

      <div className={classes.offset}></div>
      <Drawer open={open} handleClose={() => setOpen(false)} />
    </>
  )
}

export default LoginAppbar
