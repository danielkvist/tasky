import React from 'react';
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

import { drawerOpenState } from '../recoil/atoms';
import DrawerFilters from './drawer-filters';

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: theme.props.drawerWidth,
		flexShrink: 0,
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
}));

function Drawer() {
	const [open, setOpen] = useRecoilState(drawerOpenState);
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

			<DrawerFilters />
			<Divider />
		</MaterialDrawer>
	);
}

export default Drawer;
