import { atom } from "recoil"

const openAddTaskForm = atom({
  key: "openAddTaskForm",
  default: false,
})

const openAddListForm = atom({
  key: "openAddListForm",
  default: false,
})

const listToEdit = atom({
  key: "listToEdit",
  default: {},
})

export { openAddTaskForm, openAddListForm, listToEdit }
