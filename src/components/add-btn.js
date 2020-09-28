import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { makeStyles, useTheme, Fab, Zoom } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
	root: {
		background: `linear-gradient(95deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
		display: 'grid',
		placeItems: 'center',
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(4),
	},
}));

const AddTask = () => {
	const [loaded, setLoad] = useState(false);
	const theme = useTheme();
	const classes = useStyles();

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	useEffect(() => {
		setLoad(true);
	}, [setLoad]);

	return (
		<Zoom in={loaded} timeout={transitionDuration} unmountOnExit>
			<Fab
				className={classes.root}
				color="primary"
				aria-label="Add task"
				onClick={() => {}}
			>
				<AddIcon />
			</Fab>
		</Zoom>
	);
};

export default AddTask;
