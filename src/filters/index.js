import { atom } from "recoil"

const tasksFilters = {
  inbox: "INBOX",
  noCompleted: "NO_COMPLETED",
  completed: "COMPLETED",
  important: "IMPORTANT",
  today: "TODAY",
  tomorrow: "TOMORROW",
  week: "WEEK",
  project: "PROJECT",
}

const filterTasksBy = atom({
  key: "filterBy",
  default: tasksFilters.noCompleted,
})

const selectedProject = atom({
  key: "selectedProject",
  default: null,
})

export default filterTasksBy
export { tasksFilters, filterTasksBy, selectedProject }
