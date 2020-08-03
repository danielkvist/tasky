import React from "react"
import { navigate } from "gatsby"
import { useAuthState } from "react-firebase-hooks/auth"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"

import Layout from "../components/layout"
import { useFirebase } from "../firebase"

const IndexPage = () => {
  // TODO: Handle error
  const firebase = useFirebase()
  const [user] = useAuthState(firebase.auth)

  if (user) {
    navigate("/account", { replace: true })
  }

  return (
    <Layout title="Home">
      <CssBaseline />
      <Container
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h1">Tasky</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => firebase.login()}
        >
          Log In
        </Button>
      </Container>
    </Layout>
  )
}

export default IndexPage
