import { createContext } from "react"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import faker from "faker"

import Task from "../models/tasks"
import isBrowser from "./is-browser"

class Firebase {
  constructor(config) {
    if (!isBrowser()) return null
    firebase.initializeApp(config)

    this.auth = firebase.auth()
    this.db = firebase.firestore()
    this.currentUser = ""
  }

  // AUTH
  login = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider()
    this.auth.signInWithPopup(googleProvider).catch(e => console.error(e))
    this.currentUser = this.auth.currentUser
  }

  logout = async () => {
    // TODO: Clean up
    // TODO: Unsuscribe
    this.auth.signOut().catch(e => console.error(e))
  }

  // FIRESTORE
  createTask = task => {
    const document = this.db
      .collection("users")
      .doc(this.currentUser)
      .collection("tasks")
      .doc()

    const documentUuid = document.id

    document
      .set({
        ...Task,
        ...task,
        id: documentUuid,
        title: faker.lorem.sentence(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(ref => console.log(ref))
      .catch(e => console.error(e))
  }

  deleteTask = async taskId => {
    const res = await this.db
      .collection("users")
      .doc(this.currentUser)
      .collection("tasks")
      .doc(taskId)
      .delete()
  }

  updateTask = task => {}
}

const FirebaseCtx = createContext(null)

export default Firebase
export { FirebaseCtx }
