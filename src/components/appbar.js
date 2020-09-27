import React, { useState } from 'react';
import clsx from 'clsx';
import {
	AppBar as MaterialAppBar,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

import app from '../firebase';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		background: `linear-gradient(45deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${theme.props.drawerWidth}px)`,
		marginLeft: theme.props.drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
		padding: 0,
	},
	title: {
		marginRight: 'auto',
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex',
		},
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	hide: {
		display: 'none',
	},
	offset: theme.mixins.toolbar,
}));

const AppBar = () => {
	const [open, setDrawer] = useState(false);
	const [, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const classes = useStyles();
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleLogOut = () => app.auth().signOut();

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<MobileMenu
			mobileMoreAnchorEl={mobileMoreAnchorEl}
			mobileMenuId={mobileMenuId}
			isOpen={isMobileMenuOpen}
			handleMobileMenuClose={handleMobileMenuClose}
			handleProfileMenuOpen={handleProfileMenuOpen}
			handleLogOut={handleLogOut}
		/>
	);

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
							color="inherit"
							aria-label="Open drawer"
							onClick={() => setDrawer(true)}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<div className={classes.avatar}></div>
						</IconButton>

						<Typography variant="h6" className={classes.title}>
							Tasky
						</Typography>

						<div className={classes.sectionDesktop}>
							<DesktopMenu handleLogOut={handleLogOut} />
						</div>
						<div className={classes.sectionMobile}>
							<IconButton
								aria-label="Show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</div>
					</Toolbar>
				</MaterialAppBar>
			</nav>

			{renderMobileMenu}
			<div className={classes.offset}></div>
		</>
	);
};

export default AppBar;
