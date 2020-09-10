import React, { useState } from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { makeStyles } from "@material-ui/core/styles"
import { Stepper, Step, StepLabel, Button, Typography } from "@material-ui/core"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../firebase"
import { userAvatarClassState } from "../atoms/user"
import Layout from "../components/layout"
import SetupWelcome from "../components/setup-welcome"
import SetupAvatar from "../components/setup-avatar"

const useStyles = makeStyles(theme => ({
  root: {
    alignContent: "end",
    display: "grid",
    height: `calc(80vh - ${theme.mixins.toolbar.minHeight}px)`,
  },
  navigationButtons: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
  },
  completed: {
    display: "grid",
    textAlign: "center",
    placeContent: "center",
    gridGap: theme.spacing(1),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    textAlign: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

const getSteps = () => ["Welcome", "Select avatar"]

const SetupPage = () => {
  const firebase = useFirebase()
  const [activeStep, setActiveStep] = useState(0)
  const [userAvatar] = useRecoilState(userAvatarClassState)
  const steps = getSteps()
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)

  const classes = useStyles()

  const handleNext = () => {
    setActiveStep(prev => prev + 1)
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleSetupComplete = () => {
    navigate("/account/", { replace: true })
  }

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <Layout title="Setup" disable>
      <div className={classes.root}>
        <div>{activeStep === 0 ? <SetupWelcome /> : <SetupAvatar />}</div>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div className={classes.navigationButtons}>
          {activeStep === steps.length ? (
            <div className={classes.completed}>
              <Typography className={classes.instructions}>
                All steps completed
              </Typography>

              <Button onClick={handleReset}>Reset</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetupComplete}
              >
                Start
              </Button>
            </div>
          ) : (
            <div>
              <div className={classes.buttons}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={
                    activeStep === 0 ? false : !userAvatar ? true : false
                  }
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default SetupPage
