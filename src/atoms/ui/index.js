import { atom } from "recoil"

const materialThemeType = atom({
  key: "materialThemeType",
  default: "light",
})

const isDrawerOpen = atom({
  key: "isDrawerOpen",
  default: false,
})

export { materialThemeType, isDrawerOpen }
