import React, { useState, forwardRef } from "react"
import { useForm } from "react-hook-form"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Popover,
  Slide,
} from "@material-ui/core"
import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"

import { useFirebase } from "../../firebase"
import { List } from "../../models"

const useStyles = makeStyles(theme => ({
  form: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
  },
  emojiPicker: {
    display: "grid",
    placeItems: "end",
    marginRight: theme.spacing(2),
  },
}))

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const EditListForm = ({ list, open, handleClose }) => {
  const firebase = useFirebase()
  const [anchorEl, setAnchorEl] = useState(null)
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const { register, handleSubmit, reset, errors } = useForm({})

  const classes = useStyles()

  const popupOpen = Boolean(anchorEl)
  const id = open ? "emoji-popover" : undefined

  const handleEmojiPickerOpen = e => {
    setAnchorEl(e.currentTarget)
  }

  const handleEmojiPickerClose = () => {
    setAnchorEl(null)
  }

  const onEmojiClick = emoji => {
    setChosenEmoji(emoji)
    handleEmojiPickerClose()
  }

  const onClose = () => {
    handleClose()
    setChosenEmoji(null)
    reset()
  }

  const onSubmit = data => {
    // TODO: Add emoji validation
    data.listIcon = chosenEmoji || list.listIcon
    firebase.updateList({ id: list.id, ...data })
    setChosenEmoji(null)
    handleClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="Edit list"
      TransitionComponent={Transition}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="editListForm">Edit list</DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.emojiPicker}>
            <Button
              aria-describedby={id}
              variant="contained"
              disableElevation
              onClick={handleEmojiPickerOpen}
            >
              {(chosenEmoji && chosenEmoji.native) ||
                (list && list.listIcon && list.listIcon.native)}
            </Button>
            <Popover
              id={id}
              open={popupOpen}
              anchorEl={anchorEl}
              onClose={handleEmojiPickerClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Picker onSelect={onEmojiClick} />
            </Popover>
          </div>
          <TextField
            defaultValue={list.title}
            error={!!errors.title}
            fullWidth
            helperText={errors.title ? "List name is required" : ""}
            id="title"
            inputRef={register({
              required: true,
            })}
            label="Title"
            margin="dense"
            name="title"
            required
            type="text"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditListForm
