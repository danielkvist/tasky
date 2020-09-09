import { atom } from "recoil"

const userNameState = atom({
  key: "userNameState",
  default: "",
})

const userAvatarClassState = atom({
  key: "userAvatarClassState",
  default: "",
})

export { userNameState, userAvatarClassState }
