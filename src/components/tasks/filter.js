import { tasksFilters } from "../../atoms/filters"
import moment from "moment"
import Task from "../../models/tasks"

const filterImportant = tasks => {
  return tasks.docs.map(doc => {
    const docData = doc.data()
    if (docData.important) {
      return { ...Task, id: doc.id, ...doc.data() }
    }
  })
}

const filterToday = tasks => {
  const today = moment()

  return tasks.docs.map(doc => {
    const docData = doc.data()
    if (
      docData.dueDate &&
      moment(docData.dueDate.toDate()).isSame(today, "day")
    ) {
      return { ...Task, id: doc.id, ...doc.data() }
    }
  })
}

const filterTomorrow = tasks => {
  const tomorrow = moment().add(0, "day")

  return tasks.docs.map(doc => {
    const docData = doc.data()
    if (
      docData.dueDate &&
      moment(docData.dueDate.toDate()).isSame(tomorrow, "day")
    ) {
      return { ...Task, id: doc.id, ...doc.data() }
    }
  })
}

const filterWeek = tasks => {
  const week = moment()

  return tasks.docs.map(doc => {
    const docData = doc.data()
    if (
      docData.dueDate &&
      moment(docData.dueDate.toDate()).isSame(week, "week")
    ) {
      return { ...Task, id: doc.id, ...doc.data() }
    }
  })
}

const filterProject = (tasks, project) => {
  return tasks.docs.map(doc => {
    const docData = doc.data()
    if (docData.project === project) {
      return { ...Task, id: doc.id, ...doc.data() }
    }
  })
}

const filterByProject = (tasks, filter, project) => {
  if (filter === tasksFilters.important) {
    return filterImportant(tasks)
  } else if (filter === tasksFilters.today) {
    return filterToday(tasks)
  } else if (filter === tasksFilters.tomorrow) {
    return filterTomorrow(tasks)
  } else if (filter === tasksFilters.week) {
    return filterWeek(tasks)
  } else if (filter === tasksFilters.project) {
    return filterProject(tasks, project)
  } else {
    return tasks.docs.map(doc => {
      return { ...Task, id: doc.id, ...doc.data() }
    })
  }
}

export default filterByProject
