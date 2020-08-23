import React, { useState } from "react"
import {
  Fade,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

const ProjectFiltersItem = ({
  data,
  clickHandler,
  editHandler,
  deleteHandler,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <ListItem button onClick={clickHandler}>
        <ListItemIcon>
          <Typography align="left" component="p">
            {data.listIcon.native}
          </Typography>
        </ListItemIcon>

        <ListItemText primary={data.title} />

        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit list"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={editHandler}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem onClick={deleteHandler}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography>Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  )
}

export default ProjectFiltersItem
