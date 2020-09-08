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
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"

import Drawer from "./drawer"
import { isDrawerOpen, materialThemeType } from "../atoms/ui"
import { showDoneTasks } from "../atoms/filters"

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
  title: {
    marginRight: "auto",
  },
  hide: {
    display: "none",
  },
  buttonGroup: {
    "& > *": {
      marginLeft: theme.spacing(2),
    },
  },
  offset: theme.mixins.toolbar,
}))

const AppBar = ({ disable = false }) => {
  const classes = useStyles()
  const [themeType, setThemeType] = useRecoilState(materialThemeType)
  const [open, setDrawer] = useRecoilState(isDrawerOpen)
  const [showDone, setShowDone] = useRecoilState(showDoneTasks)

  const changeThemeType = () => {
    if (themeType === "light") setThemeType("dark")
    else setThemeType("light")
  }

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
                edge="end"
                color="inherit"
                aria-label="Switch theme"
                onClick={changeThemeType}
              >
                {themeType === "light" ? (
                  <Brightness4Icon />
                ) : (
                  <Brightness7Icon />
                )}
              </IconButton>

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
