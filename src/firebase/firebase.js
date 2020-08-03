import { createContext } from "react"
import firebase from "firebase/app"
import "firebase/auth"

const isBrowser = typeof window !== "undefined"

class Firebase {
  constructor(config) {
    if (!isBrowser) return null
    firebase.initializeApp(config)
    this.auth = firebase.auth()
  }

  auth = () => this.auth

  login = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()

    this.auth.signInWithPopup(googleProvider).catch(e => console.error(e))
  }

  logout = async () => {
    this.auth.signOut().catch(e => console.error(e))
  }
}

const FirebaseCtx = createContext(null)

export default Firebase
export { FirebaseCtx }
