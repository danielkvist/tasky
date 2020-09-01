import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

const Avatar = props => {
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
          return n.node.relativePath.includes(props.filename)
        })

        if (!image) {
          return null
        }

        return (
          <Img
            alt={props.alt}
            fluid={image.node.childImageSharp.fluid}
            critical={true}
          />
        )
      }}
    />
  )
}

export default Avatar
