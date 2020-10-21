import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { motion } from 'framer-motion';
import {
	Divider,
	Drawer as MaterialDrawer,
	IconButton,
	makeStyles,
	useTheme,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import {
	drawerOpenState,
	userAvatarClassState,
	userLevelState,
} from '../recoil/atoms';
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
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
	avatar: {
		cursor: 'pointer',
		height: theme.spacing(32),
		overflow: 'hidden',
		width: '100%',
	},
}));

function Drawer() {
	const [open, setOpen] = useRecoilState(drawerOpenState);
	const avatarClass = useRecoilValue(userAvatarClassState);
	const userLevel = useRecoilValue(userLevelState);

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
				<motion.div
					whileHover={{
						scale: 1.1,
						transition: { delay: 0.1, duration: 0.2, ease: [0.0, 0, 0.2, 1] },
					}}
				>
					<Avatar
						alt="User avatar"
						height="100%"
						width="100%"
						caption="User avatar"
						avatarClass={avatarClass}
						level={userLevel}
					/>
				</motion.div>
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
