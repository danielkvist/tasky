const siteMetadata = {
  title: "Tasky",
  description: "",
  author: "@danielkvist",
  siteUrl: "https://taskyapp.netlify.app/",
  copy: "",
}

const plugins = [
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-plugin-google-fonts",
    options: {
      fonts: [`roboto\:400,600,700`, `roboto slab\:400,600,700`],
      display: "swap",
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "Tasky",
      short_name: "starter",
      start_url: "/",
      background_color: "#fafafa",
      theme_color: "#29b6f6",
      display: "minimal-ui",
      icon: "static/favicon.ico",
    },
  },
  "gatsby-plugin-offline",
  "gatsby-plugin-styled-components",
  "gatsby-plugin-sharp",
  `gatsby-plugin-sitemap`,
]

module.exports = {
  siteMetadata,
  plugins,
}
