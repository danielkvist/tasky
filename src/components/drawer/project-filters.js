import React from "react"
import { useRecoilState } from "recoil"
import { useCollection } from "react-firebase-hooks/firestore"
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { useFirebase } from "../../firebase"
import {
  tasksFilters,
  filterTasksBy,
  selectedProject,
} from "../../atoms/filters"
import { listToEdit } from "../../atoms/forms"
import ProjectFiltersItem from "./project-item"

const ProjectFiltersList = ({ handleListFormOpen }) => {
  const firebase = useFirebase()
  const [, setFilter] = useRecoilState(filterTasksBy)
  const [, setProject] = useRecoilState(selectedProject)
  const [, setEditList] = useRecoilState(listToEdit)
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
      {
        // TODO: Refactor
      }
      {loading ? (
        <div style={{ display: "grid", placeItems: "center" }}>
          <CircularProgress size={24} />
        </div>
      ) : null}
      {values
        ? values.docs.map(doc => {
            const data = doc.data()
            return (
              <ProjectFiltersItem
                key={doc.id}
                id={doc.id}
                data={data}
                clickHandler={() => {
                  setFilter(tasksFilters.project)
                  setProject(doc.id)
                }}
                editHandler={() => {
                  setEditList({ id: doc.id, ...data })
                }}
                deleteHandler={() => {
                  firebase.deleteList(doc.id)
                }}
              />
            )
          })
        : null}
    </List>
  )
}

export default ProjectFiltersList
