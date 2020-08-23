import React from "react"
import { useRecoilState } from "recoil"
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import InboxIcon from "@material-ui/icons/MoveToInbox"
import ListIcon from "@material-ui/icons/List"
import StarBorderIcon from "@material-ui/icons/StarBorder"
import TodayIcon from "@material-ui/icons/Today"
import ViewWeekIcon from "@material-ui/icons/ViewWeek"
import WbSunnyIcon from "@material-ui/icons/WbSunny"

import {
  tasksFilters,
  filterTasksBy,
  selectedProject,
} from "../../atoms/filters"

const MainFiltersList = () => {
  const [filter, setFilter] = useRecoilState(filterTasksBy)
  const [project, setProject] = useRecoilState(selectedProject)

  return (
    <List>
      <ListItem
        button
        onClick={() => {
          setFilter(tasksFilters.project)
          setProject("Inbox")
        }}
      >
        <ListItemIcon>
          <InboxIcon color={project === "Inbox" ? "primary" : "inherit"} />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
      </ListItem>

      <ListItem button onClick={() => setFilter(tasksFilters.important)}>
        <ListItemIcon>
          <StarBorderIcon
            color={filter === tasksFilters.important ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Important" />
      </ListItem>

      <ListItem button onClick={() => setFilter(tasksFilters.noCompleted)}>
        <ListItemIcon>
          <ListIcon
            color={filter === tasksFilters.noCompleted ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="All tasks" />
      </ListItem>

      <ListItem button onClick={() => setFilter(tasksFilters.today)}>
        <ListItemIcon>
          <TodayIcon
            color={filter === tasksFilters.today ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItem>

      <ListItem button onClick={() => setFilter(tasksFilters.tomorrow)}>
        <ListItemIcon>
          <WbSunnyIcon
            color={filter === tasksFilters.tomorrow ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Tomorrow" />
      </ListItem>

      <ListItem button onClick={() => setFilter(tasksFilters.week)}>
        <ListItemIcon>
          <ViewWeekIcon
            color={filter === tasksFilters.week ? "primary" : "inherit"}
          />
        </ListItemIcon>
        <ListItemText primary="Week" />
      </ListItem>
    </List>
  )
}

export default MainFiltersList
