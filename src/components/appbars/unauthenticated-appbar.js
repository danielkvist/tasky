import React from "react"
import { navigate } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

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
