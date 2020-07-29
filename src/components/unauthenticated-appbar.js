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

const UnauthenticatedAppBar = () => {
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
          <Button color="inherit" onClick={() => navigate("/account")}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default UnauthenticatedAppBar
