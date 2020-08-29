import { atom } from "recoil"

const openAddTaskForm = atom({
  key: "openAddTaskForm",
  default: false,
})

const openAddListForm = atom({
  key: "openAddListForm",
  default: false,
})

const openEditTaskForm = atom({
  key: "openEditTaskForm",
  default: {},
})

const openEditListForm = atom({
  key: "openEditListForm",
  default: {},
})

export { openAddTaskForm, openAddListForm, openEditTaskForm, openEditListForm }
