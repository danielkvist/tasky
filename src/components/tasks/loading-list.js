import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    paddingTop: theme.spacing(8),
    placeItems: "center",
  },
}))

const LoadingList = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export default LoadingList
