import { atom } from "recoil"

const isAddTaskFormOpen = atom({
  key: "isAddTaskFormOpen",
  default: false,
})

const isAddListFormOpen = atom({
  key: "isAddListFormOpen",
  default: false,
})

const isEditTaskFormOpen = atom({
  key: "isEditTaskFormOpen",
  default: {},
})

const isEditListFormOpen = atom({
  key: "isEditListFormOpen",
  default: {},
})

export {
  isAddListFormOpen,
  isAddTaskFormOpen,
  isEditListFormOpen,
  isEditTaskFormOpen,
}
