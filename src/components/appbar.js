import React, { useState } from 'react';
import { useResetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import {
	AppBar as MaterialAppBar,
	IconButton,
	makeStyles,
	Toolbar,
	Typography,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';

import app from '../firebase';
import useNetworkStatus from '../hooks/use-network-status';
import {
	currentUserState,
	userAvatarClassState,
	drawerOpenState,
} from '../recoil/atoms';
import Avatar from './avatar';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import Drawer from './drawer';

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
	avatar: {
		borderRadius: '50%',
		height: theme.spacing(5),
		overflow: 'hidden',
		width: theme.spacing(5),
	},
	menuButton: {
		marginRight: theme.spacing(2),
		padding: 0,
	},
	title: {
		marginRight: 'auto',
	},
	separator: {
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
	const [, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [open, setOpen] = useRecoilState(drawerOpenState);
	const { t } = useTranslation();
	const avatarClass = useRecoilValue(userAvatarClassState);
	const network = useNetworkStatus();
	const resetCurrentUser = useResetRecoilState(currentUserState);

	const classes = useStyles();
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleLogOut = () => {
		resetCurrentUser();
		app.auth().signOut();
	};

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
			<motion.nav
				className={classes.root}
				initial={{ y: -100 }}
				animate={{ y: 0 }}
				transition={{ duration: 0.2, ease: [0.0, 0, 0.2, 1] }}
			>
				<MaterialAppBar
					position="fixed"
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Drawer />
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={() => setOpen(true)}
							edge="start"
							className={clsx(classes.menuButton, open && classes.hide)}
						>
							<div className={classes.avatar}>
								<Avatar
									alt="User avatar"
									height="100%"
									width="100%"
									caption="User avatar"
									avatarClass={avatarClass}
									level="avatar"
								/>
							</div>
						</IconButton>

						<Typography
							variant="h6"
							className={clsx(classes.title, open && classes.hide)}
						>
							{network ? 'Tasky' : t('status.offline')}
						</Typography>
						{open ? <div className={classes.separator}></div> : null}

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
			</motion.nav>

			{renderMobileMenu}
			<div className={classes.offset}></div>
		</>
	);
};

export default AppBar;
