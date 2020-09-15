import React, { useState } from "react"
import { useRecoilState } from "recoil"
import clsx from "clsx"
import {
  AppBar as MaterialAppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Switch,
  Grid,
  Divider,
} from "@material-ui/core"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import MoreIcon from "@material-ui/icons/MoreVert"
import AccountCircle from "@material-ui/icons/AccountCircle"
import NotificationsIcon from "@material-ui/icons/Notifications"
import SettingsIcon from "@material-ui/icons/Settings"

import { useFirebase } from "../firebase"
import { isDrawerOpen, materialThemeType } from "../atoms/ui"
import { userNameState, userAvatarClassState } from "../atoms/user"
import Avatar from "./avatar"
import Drawer from "./drawer"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: `linear-gradient(45deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${theme.props.drawerWidth}px)`,
    marginLeft: theme.props.drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: 0,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  title: {
    marginRight: "auto",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
  },
  offset: theme.mixins.toolbar,
}))

const AppBar = ({ disable = false }) => {
  const firebase = useFirebase()
  const [open, setDrawer] = useRecoilState(isDrawerOpen)
  const [themeType, setThemeType] = useRecoilState(materialThemeType)
  const [userName] = useRecoilState(userNameState)
  const [userAvatar] = useRecoilState(userAvatarClassState)
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const classes = useStyles()

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Dark mode</Grid>
            <Grid item>
              <Switch
                checked={themeType === "dark"}
                onChange={() =>
                  setThemeType(themeType === "dark" ? "light" : "dark")
                }
                name="dark-mode"
              />
            </Grid>
          </Grid>
        </Typography>
      </MenuItem>

      <Divider />

      <MenuItem>
        <IconButton aria-label="Show notifications" color="inherit">
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem>
        <IconButton aria-label="Settings" color="inherit">
          <SettingsIcon />
        </IconButton>
        <p>Settings</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Log Out"
          onClick={() => firebase.logout()}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <nav className={classes.root}>
        <MaterialAppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              disabled={disable}
              color="inherit"
              aria-label="Open drawer"
              onClick={() => setDrawer(true)}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <div className={classes.avatar}>
                <Avatar
                  title={userName}
                  alt={userName}
                  filename={`${userAvatar || "fenix"}/01.png`}
                  rounded={true}
                />
              </div>
            </IconButton>

            <Typography variant="h6" className={classes.title}>
              Tasky
            </Typography>

            <div className={classes.sectionDesktop}>
              {themeType === "light" ? (
                <IconButton
                  aria-label="Enable dark mode"
                  color="inherit"
                  onClick={() => setThemeType("dark")}
                >
                  <Brightness7Icon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Disable dark mode"
                  color="inherit"
                  onClick={() => setThemeType("light")}
                >
                  <Brightness4Icon />
                </IconButton>
              )}
              <IconButton
                aria-label="Show notifications"
                color="inherit"
                disabled={disable}
              >
                <NotificationsIcon />
              </IconButton>

              <IconButton
                edge="end"
                aria-label="Log Out"
                onClick={() => firebase.logout()}
                color="inherit"
                disabled={disable}
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                disabled={disable}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </MaterialAppBar>
      </nav>

      {renderMobileMenu}
      <div className={classes.offset}></div>
      <Drawer />
    </>
  )
}

export default AppBar
