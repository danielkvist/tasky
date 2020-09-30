import React from 'react';
import { useRecoilState } from 'recoil';
import { IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { materialThemeTypeState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const DesktopMenu = ({ handleLogOut }) => {
	const [themeType, setThemeType] = useRecoilState(materialThemeTypeState);
	const [, setLcTheme] = useLocalStorage('theme', themeType);

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
				aria-label="Log Out"
				onClick={handleLogOut}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
		</div>
	);
};

export default DesktopMenu;
