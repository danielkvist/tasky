import React from "react"
import { useRecoilState } from "recoil"
import clsx from "clsx"
import {
  AppBar as MaterialAppBar,
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
import { isDrawerOpen } from "../../atoms/ui"
import { showDoneTasks } from "../../atoms/filters"

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
    width: `calc(100% - ${theme.props.drawerWidth}px)`,
    marginLeft: theme.props.drawerWidth,
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

const AppBar = ({ disable = false }) => {
  const classes = useStyles()
  const [open, setDrawer] = useRecoilState(isDrawerOpen)
  const [showDone, setShowDone] = useRecoilState(showDoneTasks)

  return (
    <>
      <nav className={classes.root}>
        <CssBaseline />
        <MaterialAppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              disabled={disable}
              color="inherit"
              aria-label="open drawer"
              onClick={() => setDrawer(true)}
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
                disabled={disable}
                aria-label="Display done"
                edge="end"
                color="inherit"
                onClick={() => setShowDone(!showDone)}
              >
                {showDone ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
              <IconButton
                disabled={disable}
                aria-label="Notifications"
                edge="end"
                color="inherit"
              >
                <NotificationsNone />
              </IconButton>
            </div>
          </Toolbar>
        </MaterialAppBar>
      </nav>

      <div className={classes.offset}></div>
      <Drawer open={open} handleClose={() => setDrawer(false)} />
    </>
  )
}

export default AppBar
