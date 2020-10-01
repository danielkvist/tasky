import React from 'react';
import { useRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import {
	IconButton,
	Menu,
	MenuItem,
	Typography,
	Switch,
	Grid,
	Divider,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

import { materialThemeTypeState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';

const MobileMenu = ({
	mobileMoreAnchorEl,
	mobileMenuId,
	isOpen,
	handleMobileMenuClose,
	handleLogOut,
}) => {
	const [themeType, setThemeType] = useRecoilState(materialThemeTypeState);
	const [, setLcTheme] = useLocalStorage('theme', themeType);

	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<Typography component="div">
					<Grid component="label" container alignItems="center" spacing={1}>
						<Grid item>
							<Trans i18nKey="menu.theme">Dark mode</Trans>
						</Grid>
						<Grid item>
							<Switch
								checked={themeType === 'dark'}
								onChange={() => {
									setThemeType(themeType === 'dark' ? 'light' : 'dark');
									setLcTheme(themeType === 'dark' ? 'light' : 'dark');
								}}
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
				<Trans i18nKey="menu.notifications">Notifications</Trans>
			</MenuItem>

			<MenuItem>
				<IconButton aria-label="Settings" color="inherit">
					<SettingsIcon />
				</IconButton>
				<Trans i18nKey="menu.settings">Settings</Trans>
			</MenuItem>

			<MenuItem onClick={handleLogOut}>
				<IconButton aria-label="Log Out" color="inherit">
					<AccountCircle />
				</IconButton>
				<Trans i18nKey="menu.logout">Log Out</Trans>
			</MenuItem>
		</Menu>
	);
};

export default MobileMenu;
