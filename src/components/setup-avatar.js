import React from "react"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"

import { userAvatarClassState } from "../atoms/user"
import Avatar from "../components/drawer/avatar"

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto",
    marginBottom: theme.spacing(4),
    width: theme.spacing(52),
    height: theme.spacing(52),
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  button: {
    borderRadius: "50%",
    backgroundColor: "transparent",
    border: "none",
  },
}))

const SetupAvatar = () => {
  const [, setUserAvatar] = useRecoilState(userAvatarClassState)
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      {["Fenix", "Chakra", "Tardigrade", "Ygdrasil"].map(avatar => {
        return (
          <button
            className={classes.button}
            key="avatar"
            onClick={() => {
              setUserAvatar(avatar.toLowerCase())
            }}
          >
            <Avatar
              alt={avatar}
              filename={`${avatar.toLowerCase()}/avatar.png`}
            />
          </button>
        )
      })}
    </Paper>
  )
}

export default SetupAvatar
