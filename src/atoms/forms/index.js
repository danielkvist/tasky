import { atom } from "recoil"

const openAddTaskForm = atom({
  key: "openAddTaskForm",
  default: false,
})

const openAddListForm = atom({
  key: "openAddListForm",
  default: false,
})

export { openAddTaskForm, openAddListForm }
