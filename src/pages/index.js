import React from "react"
import { navigate } from "gatsby"
import CssBaseline from "@material-ui/core/CssBaseline"
import Typography from "@material-ui/core/Typography"
import Container from "@material-ui/core/Container"
import Button from "@material-ui/core/Button"

import Layout from "../components/layout"

const IndexPage = () => {
  return (
    <Layout>
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
          onClick={() => navigate("/account")}
        >
          Login
        </Button>
      </Container>
    </Layout>
  )
}

export default IndexPage
