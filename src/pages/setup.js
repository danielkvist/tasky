import React, { useEffect } from "react"
import { navigate } from "gatsby"
import { useRecoilState } from "recoil"
import { useAuthState } from "react-firebase-hooks/auth"

import { useFirebase } from "../firebase"
import { userAvatarClass } from "../atoms/user"
import Layout from "../components/layouts"
import Avatar from "../components/drawer/avatar"

const SetupPage = () => {
  const firebase = useFirebase()
  // TODO: Handle error
  const [user] = useAuthState(firebase.auth)
  const [avatar, setAvatar] = useRecoilState(userAvatarClass)

  useEffect(() => {
    if (avatar) {
      navigate("/account/", { replace: true })
    }
  }, [avatar])

  if (!user) {
    navigate("/", { replace: true })
  }

  return (
    <Layout title="Setup" disable>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          height: "90vh",
          gap: "1.25rem",
        }}
      >
        {["fenix", "chakra", "tardigrade", "ygdrasil"].map(avatarClass => {
          return (
            <button
              key={avatarClass}
              onClick={() => setAvatar(avatarClass)}
              style={{
                width: "12rem",
                border: "none",
                backgroundColor: "transparent",
              }}
            >
              <Avatar
                alt={avatarClass}
                filename={`${avatarClass}/avatar.png`}
              />
            </button>
          )
        })}
      </div>
    </Layout>
  )
}

export default SetupPage
