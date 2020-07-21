import React from "react"
import { Router } from "@reach/router"
import { Link } from "gatsby"

import { login, logout, isAuthenticated, getProfile } from "../utils/auth"

const Home = ({ user }) => <p>Hello, {user.name ? user.name : "Unknown"}</p>
const Settings = () => <p>Settings</p>

const AccountPage = () => {
  if (!isAuthenticated()) {
    login()
    return <p>Redirecting to login...</p>
  }

  const user = getProfile()

  return (
    <header>
      <nav>
        <Link to="/account">Home</Link>
        <br />
        <Link to="/account/settings">Settings</Link>
        <br />
        <a
          href="#logout"
          onClick={e => {
            logout()
            e.preventDefault()
          }}
        >
          Log Out
        </a>
      </nav>
      <Router>
        <Home path="/account" user={user} />
        <Settings path="/account/settings" />
      </Router>
    </header>
  )
}

export default AccountPage
