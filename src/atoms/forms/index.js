import { atom } from "recoil"

const openAddTaskForm = atom({
  key: "openAddTaskForm",
  default: false,
})

const openAddListForm = atom({
  key: "openAddListForm",
  default: false,
})

const taskToEdit = atom({
  key: "taskToEdit",
  default: {},
})

const listToEdit = atom({
  key: "listToEdit",
  default: {},
})

export { openAddTaskForm, openAddListForm, taskToEdit, listToEdit }
