import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import { useFirebase } from "../../firebase"

const Avatar = ({ filename, alt }) => {
  const firebase = useFirebase()

  return (
    <StaticQuery
      query={graphql`
        query {
          images: allFile {
            edges {
              node {
                relativePath
                name
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const image = data.images.edges.find(n => {
          return n.node.relativePath.includes(filename)
        })

        if (!image) {
          return null
        }

        return <Img alt={alt} fluid={image.node.childImageSharp.fluid} />
      }}
    />
  )
}

export default Avatar
