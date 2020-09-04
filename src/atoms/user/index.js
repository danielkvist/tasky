import { atom } from "recoil"

const userAvatarClass = atom({
  key: "userAvatarClass",
  default: "",
})

export { userAvatarClass }
