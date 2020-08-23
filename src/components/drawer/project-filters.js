import React from "react"
import { useRecoilState } from "recoil"
import { useCollection } from "react-firebase-hooks/firestore"
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import MoreVertIcon from "@material-ui/icons/MoreVert"

import { useFirebase } from "../../firebase"
import { tasksFilters, filterTasksBy, selectedProject } from "../../filters"

const ProjectFiltersList = ({ handleListFormOpen }) => {
  const firebase = useFirebase()
  const [filter, setFilter] = useRecoilState(filterTasksBy)
  const [project, setProject] = useRecoilState(selectedProject)
  const [values, loading, error] = useCollection(
    firebase.db.collection(`users/${firebase.auth.currentUser.uid}/lists`),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <List>
      <ListItem button onClick={handleListFormOpen}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add list" />
      </ListItem>
      {values
        ? values.docs.map(doc => {
            const data = doc.data()
            return (
              <ListItem
                key={doc.id}
                button
                onClick={() => {
                  setFilter(tasksFilters.project)
                  setProject(doc.id)
                }}
              >
                <ListItemIcon>
                  <Typography align="left" component="p">
                    {data.listIcon.native}
                  </Typography>
                </ListItemIcon>

                <ListItemText primary={data.title} />

                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit">
                    <MoreVertIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )
          })
        : null}
    </List>
  )
}

export default ProjectFiltersList
