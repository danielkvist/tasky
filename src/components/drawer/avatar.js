import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const Avatar = ({ avatar, number, username = "Username" }) => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      file(relativePath: { eq: "avatars/fenix/01.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <Img fluid={data.file.childImageSharp.fluid} alt={username} />
}

export default Avatar
