import { useContext } from "react"

import { FirebaseCtx } from "./firebase"
import isBrowser from "./is-browser"

export default () => {
  if (!isBrowser()) return { auth: () => {} }
  const firebase = useContext(FirebaseCtx)
  return firebase
}
