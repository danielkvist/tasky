import React from 'react';
import { useRecoilValue } from 'recoil';
import { makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

import { userExpState } from '../recoil/atoms';

const useStyles = makeStyles((theme) => ({
	root: {
		height: theme.spacing(3),
		minHeight: theme.spacing(2),
		width: '100%',
		margin: 0,
	},
}));

const UserExp = () => {
	const exp = useRecoilValue(userExpState);
	const classes = useStyles();

	const expPerc = Math.floor(100 * (exp / 100));

	return (
		<div
			className={classes.root}
			style={{
				background: `linear-gradient(to right, ${green[400]} ${expPerc / 3}%, ${
					green[700]
				} ${expPerc / 1}%, transparent ${expPerc}%)`,
			}}
		></div>
	);
};

export default UserExp;
