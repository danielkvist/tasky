import { useContext } from "react"
import { FirebaseCtx } from "./firebase"

export default () => {
  const firebase = useContext(FirebaseCtx)
  return firebase
}
