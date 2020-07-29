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
      fonts: [`roboto\:300,400,500,700`],
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
  "gatsby-plugin-sharp",
  "gatsby-plugin-sitemap",
  {
    resolve: "gatsby-plugin-material-ui",
    options: {
      injectFirst: true,
    },
  },
  "gatsby-plugin-styled-components",
]

module.exports = {
  siteMetadata,
  plugins,
}
