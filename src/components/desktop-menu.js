import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { materialThemeTypeState, configDialogState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const DesktopMenu = ({ handleLogOut }) => {
	const [themeType, setThemeType] = useRecoilState(materialThemeTypeState);
	const setConfig = useSetRecoilState(configDialogState);
	const [, setLcTheme] = useLocalStorage('theme', themeType);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const themeToggle = (type) => {
		setThemeType(type);
		setLcTheme(type);
	};

	return (
		<div>
			{themeType === 'light' ? (
				<IconButton
					aria-label="Enable dark mode"
					color="inherit"
					onClick={() => themeToggle('dark')}
				>
					<Brightness7Icon />
				</IconButton>
			) : (
				<IconButton
					aria-label="Disable dark mode"
					color="inherit"
					onClick={() => themeToggle('light')}
				>
					<Brightness4Icon />
				</IconButton>
			)}
			<IconButton aria-label="Show notifications" color="inherit" disabled>
				<NotificationsIcon />
			</IconButton>

			<IconButton
				edge="end"
				aria-label="Settings"
				onClick={handleMenuOpen}
				aria-haspopup="true"
				color="inherit"
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={() => setConfig(true)}>
					<IconButton edge="start" aria-label="Log out" color="inherit">
						<SettingsIcon />
					</IconButton>
					Settings
				</MenuItem>
				<MenuItem
					onClick={() => {
						handleMenuClose();
						handleLogOut();
					}}
				>
					<IconButton edge="start" aria-label="Log out" color="inherit">
						<AccountCircle />
					</IconButton>
					Log Out
				</MenuItem>
			</Menu>
		</div>
	);
};

export default DesktopMenu;
