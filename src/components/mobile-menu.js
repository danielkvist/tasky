import React from 'react';
import { useSetRecoilState } from 'recoil';
import { Trans } from 'react-i18next';
import { IconButton, Menu, MenuItem, Divider } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

import { configDialogState } from '../recoil/atoms';
import SwitchTheme from './switch-theme';

const MobileMenu = ({
	mobileMoreAnchorEl,
	mobileMenuId,
	isOpen,
	handleMobileMenuClose,
	handleLogOut,
}) => {
	const setConfig = useSetRecoilState(configDialogState);

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
				<SwitchTheme />
			</MenuItem>

			<Divider />

			<MenuItem>
				<IconButton
					edge="start"
					aria-label="Show notifications"
					color="inherit"
				>
					<NotificationsIcon />
				</IconButton>
				<Trans i18nKey="menu.notifications">Notifications</Trans>
			</MenuItem>

			<MenuItem onClick={() => setConfig(true)}>
				<IconButton edge="start" aria-label="Settings" color="inherit">
					<SettingsIcon />
				</IconButton>
				<Trans i18nKey="menu.settings">Settings</Trans>
			</MenuItem>

			<MenuItem onClick={handleLogOut}>
				<IconButton edge="start" aria-label="Log Out" color="inherit">
					<AccountCircle />
				</IconButton>
				<Trans i18nKey="menu.logout">Log Out</Trans>
			</MenuItem>
		</Menu>
	);
};

export default MobileMenu;
