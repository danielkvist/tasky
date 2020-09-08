import { createMuiTheme } from "@material-ui/core/styles"
import { blue, green, orange } from "@material-ui/core/colors"

const drawerWidth = 240

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: blue,
    secondary: green,
  },
  props: {
    drawerWidth,
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: orange,
    secondary: blue,
  },
  props: {
    drawerWidth,
  },
})

export { lightTheme, darkTheme }
