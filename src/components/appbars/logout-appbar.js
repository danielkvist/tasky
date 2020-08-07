import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"

import { useFirebase } from "../../firebase"

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

const LogoutAppbar = () => {
  const firebase = useFirebase()
  const classes = useStyles()

  return (
    <nav className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Tasky
          </Typography>
          <Button color="inherit" onClick={() => firebase.login()}>
            Log In
          </Button>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default LogoutAppbar
