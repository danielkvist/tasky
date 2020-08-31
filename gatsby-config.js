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
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images/`,
    },
  },
  "gatsby-transformer-sharp",
  "gatsby-plugin-sharp",
  "gatsby-plugin-sitemap",
  {
    resolve: "gatsby-plugin-material-ui",
    options: {
      injectFirst: true,
    },
  },
  "gatsby-plugin-styled-components",
  {
    resolve: `gatsby-plugin-env-variables`,
    options: {
      allowList: [
        "FIREBASE_API_KEY",
        "FIREBASE_AUTH_DOMAIN",
        "FIREBASE_DB_URL",
        "FIREBASE_PROJECT_ID",
        "FIREBASE_STORAGE_BUCKET",
        "FIREBASE_MESSAGING_SENDER_ID",
        "FIREBASE_APP_ID",
      ],
    },
  },
]

module.exports = {
  siteMetadata,
  plugins,
}
