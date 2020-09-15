import { createMuiTheme } from "@material-ui/core/styles"
import { blue, green } from "@material-ui/core/colors"

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
    primary: blue,
    secondary: green,
  },
  props: {
    drawerWidth,
  },
})

export { lightTheme, darkTheme }
