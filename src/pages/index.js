import React from "react"
import { navigate } from "gatsby"
import { useAuthState } from "react-firebase-hooks/auth"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"

import { LogoutLayout } from "../components/layouts"
import { useFirebase } from "../firebase"

const IndexPage = () => {
  const firebase = useFirebase()
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  if (user) {
    navigate("/account/", { replace: true })
  }

  return (
    <LogoutLayout title="Home">
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
          Log In with Google
        </Button>
      </Container>
    </LogoutLayout>
  )
}

export default IndexPage
