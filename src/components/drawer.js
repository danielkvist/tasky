import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
	Divider,
	Drawer as MaterialDrawer,
	IconButton,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { drawerOpenState, userAvatarClassState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';
import Avatar from './avatar';
import UserExp from './drawer-exp';
import DrawerFilters from './drawer-filters';
import DrawerLists from './drawer-lists';

const useStyles = makeStyles((theme) => ({
	drawer: {
		flexShrink: 0,
		width: theme.props.drawerWidth,
	},
	drawerPaper: {
		width: theme.props.drawerWidth,
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	avatar: {
		width: '100%',
		height: 'auto',
	},
}));

function Drawer() {
	const [open, setOpen] = useRecoilState(drawerOpenState);
	const [avatarClass, setAvatarClass] = useRecoilState(userAvatarClassState);
	const [lsAvatarClass] = useLocalStorage('avatarClass', 'fenix');

	useEffect(() => {
		setAvatarClass(lsAvatarClass);
	});

	const theme = useTheme();
	const classes = useStyles();

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<MaterialDrawer
			className={classes.drawer}
			variant="persistent"
			anchor="left"
			open={open}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'rtl' ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</div>

			<Divider />
			<div className={classes.avatar}>
				<Avatar
					alt="User avatar"
					height="100%"
					width="100%"
					caption="User avatar"
					avatarClass={avatarClass}
				/>
			</div>

			<Divider />
			<UserExp />

			<Divider />
			<DrawerFilters />

			<Divider />
			<DrawerLists />
		</MaterialDrawer>
	);
}

export default Drawer;
