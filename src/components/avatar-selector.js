import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography, makeStyles } from '@material-ui/core';

import useLocalStorage from '../hooks/use-local-storage';
import Avatar from './avatar';

const useStyles = makeStyles((theme) => ({
	avatars: {
		display: 'grid',
		gridTemplateColumns: 'repeat(4, 1fr)',
	},
	selected: {
		width: theme.spacing(9),
		height: theme.spacing(9),
		marginRight: theme.spacing(2),
		filter: 'grayscale(0)',
	},
	nonSelected: {
		width: theme.spacing(9),
		height: theme.spacing(9),
		marginRight: theme.spacing(2),
		filter: 'grayscale(1)',
	},
}));

const AvatarClassSelector = ({ setup }) => {
	const { t } = useTranslation();
	const [lsAvatarClass, setLsAvatarClass] = useLocalStorage(
		'avatarClass',
		'fenix'
	);
	const [, setLsUserLevel] = useLocalStorage('userLevel', 1);
	const [, setLsUserExp] = useLocalStorage('userExp', 10);

	const handleUpdate = (avatarClass) => {
		setLsAvatarClass(avatarClass);
		setLsUserLevel(1);
		setLsUserExp(10);
	};

	const classes = useStyles();

	return (
		<Typography component="div">
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid
					item
					xs={setup ? '12' : ''}
					style={{ textAlign: setup ? 'center' : 'left' }}
				>
					<Typography variant={setup ? 'h5' : 'body1'} component="p">
						{t('config.avatar')}
					</Typography>
				</Grid>
				<Grid item xs={setup ? '12' : ''}>
					<div className={classes.avatars}>
						<div
							className={
								lsAvatarClass === 'fenix'
									? classes.selected
									: classes.nonSelected
							}
							onClick={() => handleUpdate('fenix')}
						>
							<Avatar
								alt="Fenix"
								height="100%"
								width="100%"
								caption="User avatar"
								avatarClass="fenix"
								level="avatar"
							/>
						</div>
						<div
							className={
								lsAvatarClass === 'tardigrade'
									? classes.selected
									: classes.nonSelected
							}
							onClick={() => handleUpdate('tardigrade')}
						>
							<Avatar
								alt="Tardigrade"
								height="100%"
								width="100%"
								caption="Tardigrade"
								avatarClass="tardigrade"
								level="avatar"
							/>
						</div>
						<div
							className={
								lsAvatarClass === 'chakra'
									? classes.selected
									: classes.nonSelected
							}
							onClick={() => handleUpdate('chakra')}
						>
							<Avatar
								alt="Chakra"
								height="100%"
								width="100%"
								caption="Chakra"
								avatarClass="chakra"
								level="avatar"
							/>
						</div>
						<div
							className={
								lsAvatarClass === 'ygdrasil'
									? classes.selected
									: classes.nonSelected
							}
							onClick={() => handleUpdate('ygdrasil')}
						>
							<Avatar
								alt="Ygdrasil"
								height="100%"
								width="100%"
								caption="Ygdrasil"
								avatarClass="ygdrasil"
								level="avatar"
							/>
						</div>
					</div>
				</Grid>
			</Grid>
		</Typography>
	);
};

export default AvatarClassSelector;
