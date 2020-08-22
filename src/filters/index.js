import { atom } from "recoil"

const tasksFilters = {
  inbox: "INBOX",
  noCompleted: "NO_COMPLETED",
  completed: "COMPLETED",
  important: "IMPORTANT",
  today: "TODAY",
  tomorrow: "TOMORROW",
  week: "WEEK",
}

const filterTasksBy = atom({
  key: "filterBy",
  default: tasksFilters.noCompleted,
})

export default filterTasksBy
export { tasksFilters, filterTasksBy }
