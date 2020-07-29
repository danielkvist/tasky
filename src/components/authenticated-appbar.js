import React from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import NotificationsNone from "@material-ui/icons/NotificationsNone"
import SettingsIcon from "@material-ui/icons/Settings"

import { logout } from "../utils/auth"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const AuthenticatedAppBar = () => {
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tasky
          </Typography>
          <Button color="inherit" onClick={() => logout()}>
            Log Out
          </Button>

          <IconButton aria-label="Notifications" edge="end" color="inherit">
            <NotificationsNone />
          </IconButton>

          <IconButton
            aria-label="Display more actions"
            edge="end"
            color="inherit"
            onClick={() => navigate("/accounts/settings")}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default AuthenticatedAppBar
