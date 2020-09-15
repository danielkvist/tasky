import { createContext } from "react"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { Task, List, Config } from "../models"
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
    this.currentUser = ""
    this.auth.signOut().catch(e => console.error(e))
  }

  // FIRESTORE
  createTask = async task => {
    const document = this.db
      .collection("users")
      .doc(this.currentUser)
      .collection("tasks")
      .doc()

    const documentUuid = document.id
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()

    try {
      await document.set({
        ...Task,
        ...task,
        id: documentUuid,
        createdAt: timestamp,
        lastModified: timestamp,
      })
    } catch (e) {
      console.log(e)
    }
  }

  createList = async list => {
    const document = this.db
      .collection("users")
      .doc(this.currentUser)
      .collection("lists")
      .doc()

    const documentUuid = document.id

    try {
      await document.set({
        ...List,
        ...list,
        id: documentUuid,
      })
    } catch (e) {
      console.log(e)
    }
  }

  createConfig = async config => {
    const document = this.db
      .collection("users")
      .doc(this.currentUser)
      .collection("configs")
      .doc()

    const documentUuid = document.id

    try {
      await document.set({
        ...Config,
        ...config,
        id: documentUuid,
      })
    } catch (e) {
      console.log(e)
    }
  }

  deleteTask = async taskId => {
    try {
      await this.db
        .collection("users")
        .doc(this.currentUser)
        .collection("tasks")
        .doc(taskId)
        .delete()
    } catch (e) {
      console.log(e)
    }
  }

  deleteList = async listId => {
    try {
      await this.db
        .collection("users")
        .doc(this.currentUser)
        .collection("lists")
        .doc(listId)
        .delete()

      const tasksInList = await this.db
        .collection("users")
        .doc(this.currentUser)
        .collection("tasks")
        .where("project", "==", listId)

      tasksInList.get().then(snapshot => {
        snapshot.forEach(doc => doc.ref.delete())
      })
    } catch (e) {
      console.log(e)
    }
  }

  updateTask = async task => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()

    try {
      await this.db
        .collection("users")
        .doc(this.currentUser)
        .collection("tasks")
        .doc(task.id)
        .update({ ...task, lastModified: timestamp })
    } catch (e) {
      console.log(e)
    }
  }

  updateList = async list => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()

    try {
      await this.db
        .collection("users")
        .doc(this.currentUser)
        .collection("lists")
        .doc(list.id)
        .update({ ...list, lastModified: timestamp })
    } catch (e) {
      console.log(e)
    }
  }
}

const FirebaseCtx = createContext(null)

export default Firebase
export { FirebaseCtx }
