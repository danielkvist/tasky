import React, { useState, forwardRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	makeStyles,
	MobileStepper,
	Slide,
	useMediaQuery,
	useTheme,
	Typography,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { setupState } from '../recoil/atoms';
import useLocalStorage from '../hooks/use-local-storage';
import AvatarSelector from './avatar-selector';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridTemplateRows: '1fr auto',
	},
	step: {
		display: 'grid',
		placeItems: 'center',
		marginBottom: theme.spacing(3),
	},
	stepper: {
		flexGrow: 1,
		maxWidth: theme.breakpoints['sm'],
		padding: theme.spacing(3),
	},
}));

const FinishSetup = () => {
	const setSetup = useSetRecoilState(setupState);
	const [, setLsSetup] = useLocalStorage('setup', 'false');
	const { t } = useTranslation();

	return (
		<Button
			variant="contained"
			color="primary"
			onClick={() => {
				setLsSetup(true);
				setSetup(false);
				window.location.reload(false);
			}}
		>
			{t('setup.finish')}
		</Button>
	);
};

const Welcome = () => {
	const { t } = useTranslation();
	return (
		<Typography variant="h5" component="p">
			{t('setup.welcome')}
		</Typography>
	);
};

const getStep = (step) => {
	switch (step) {
		case 1:
			return <AvatarSelector setup={true} />;
		case 2:
			return <FinishSetup />;
		default:
			return <Welcome />;
	}
};

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const Setup = () => {
	const [activeStep, setActiveStep] = useState(0);
	const setup = useRecoilValue(setupState);
	const { t } = useTranslation();

	const maxSetps = 3;

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));
	const classes = useStyles();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<Dialog
			open={setup}
			arial-labelledby={t('setup.title')}
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
			fullScreen={matches}
			disableBackdropClick
			disableEscapeKeyDown
		>
			<DialogTitle id="setup-dialog">{t('setup.title')}</DialogTitle>
			<DialogContent className={classes.root}>
				<div className={classes.step}>{getStep(activeStep)}</div>
				<MobileStepper
					variant="dots"
					steps={maxSetps}
					position="static"
					activeStep={activeStep}
					className={classes.stepper}
					nextButton={
						<Button
							size="small"
							onClick={handleNext}
							disabled={activeStep === maxSetps}
						>
							{t('setup.next')}
							{theme.direction === 'rtl' ? (
								<KeyboardArrowLeft />
							) : (
								<KeyboardArrowRight />
							)}
						</Button>
					}
					backButton={
						<Button
							size="small"
							onClick={handleBack}
							disabled={activeStep === 0}
						>
							{theme.direction === 'rtl' ? (
								<KeyboardArrowRight />
							) : (
								<KeyboardArrowLeft />
							)}
							{t('setup.back')}
						</Button>
					}
				></MobileStepper>
			</DialogContent>
		</Dialog>
	);
};

export default Setup;
