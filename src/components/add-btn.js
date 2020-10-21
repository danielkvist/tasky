import React from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { makeStyles, useTheme, Fab, Zoom } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { taskFormState } from '../recoil/atoms';

const useStyles = makeStyles((theme) => ({
	root: {
		borderRadius: '50%',
		display: 'grid',
		placeItems: 'center',
		position: 'absolute',
		bottom: theme.spacing(4),
		right: theme.spacing(4),
	},
	button: {
		background: `linear-gradient(95deg, ${theme.palette.primary[400]} 30%, ${theme.palette.primary[700]} 90%)`,
	},
}));

const AddTask = () => {
	const [taskForm, setTaskForm] = useRecoilState(taskFormState);
	const theme = useTheme();
	const classes = useStyles();

	const transitionDuration = {
		enter: theme.transitions.duration.enteringScreen,
		exit: theme.transitions.duration.leavingScreen,
	};

	return (
		<Zoom in={!taskForm} timeout={transitionDuration} unmountOnExit>
			<motion.div
				className={classes.root}
				initial={{ scale: 0, rotateZ: 0 }}
				animate={{ scale: 1, rotateZ: 360 }}
				transition={{ delay: 0.6, duration: 0.2, ease: [0.0, 0, 0.2, 1] }}
			>
				<Fab
					color="primary"
					aria-label="Add task"
					onClick={() => setTaskForm(true)}
				>
					<AddIcon />
				</Fab>
			</motion.div>
		</Zoom>
	);
};

export default AddTask;
