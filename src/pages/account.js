import React from "react"

import { login, isAuthenticated } from "../utils/auth"
import Layout from "../components/layout"
import { AddTaskButton } from "../components/buttons"

const AccountPage = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  return (
    <Layout title="Account">
      <AddTaskButton />
    </Layout>
  )
}

export default AccountPage
