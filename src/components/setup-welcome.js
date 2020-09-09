import React from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { TextField } from "@material-ui/core"

import { userNameState } from "../atoms/user"

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    placeContent: "center",
    marginBottom: theme.spacing(16),
  },
}))

const SetupWelcome = () => {
  const [userName, setUserName] = useRecoilState(userNameState)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <TextField
        id="userName"
        label="Your name"
        helperText={"Left blank to use your Google's account name!"}
        type="text"
        value={userName}
        onChange={e => setUserName(e.target.value)}
        fullWidth
      />
    </div>
  )
}

export default SetupWelcome
