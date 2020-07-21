// onCreatePage is called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key
  // used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = "/account/*"

    // update the page.
    createPage(page)
  }
}

// auth-js will break because it relies on
// browser-specific APIs. As we don't need
// it during the build, we use webpack's null
// loader preventing out app from breaking.
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-js/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
