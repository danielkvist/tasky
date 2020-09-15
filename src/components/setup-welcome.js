import React from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"

import { userNameState } from "../atoms/user"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    marginBottom: theme.spacing(4),
    width: theme.spacing(52),
    height: theme.spacing(52),
    display: "grid",
    alignContent: "center",
  },
}))

const SetupWelcome = () => {
  const [userName, setUserName] = useRecoilState(userNameState)
  const classes = useStyles()

  return (
    <form className={classes.root}>
      <TextField
        id="userName"
        label="Your name"
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        fullWidth
      />
    </form>
  )
}

export default SetupWelcome
