import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"

import Layout from "../components/layout"
import { login, isAuthenticated } from "../utils/auth"

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    bottom: 0,
    position: "absolute",
    right: 0,
  },
}))

const AccountPage = () => {
  const classes = useStyles()

  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  return (
    <Layout title="Account">
      <div className={classes.root}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </Layout>
  )
}

export default AccountPage
