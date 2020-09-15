import React from "react"
import { graphql, StaticQuery } from "gatsby"
import { useTheme } from "@material-ui/core/styles"
import Img from "gatsby-image"

const Avatar = ({ filename, title = "", alt = "", rounded = false }) => {
  const theme = useTheme()

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

        return (
          <Img
            title={title}
            alt={alt}
            backgroundColor={theme.palette.primary[50]}
            style={{
              borderRadius: rounded ? "50%" : "0%",
            }}
            fluid={image.node.childImageSharp.fluid}
            fadeIn
          />
        )
      }}
    />
  )
}

export default Avatar
