import React, { forwardRef } from 'react';
import { useRecoilState } from 'recoil';
import { useTranslation, Trans } from 'react-i18next';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle as MaterialDialogTitle,
	Slide,
	useMediaQuery,
	useTheme,
} from '@material-ui/core';

import { configDialogState } from '../recoil/atoms';
import SwitchTheme from './switch-theme';
import AvatarClassSelector from './avatar-selector';
import PaletteSelector from './palette-selector';
import DateFormatSelector from './date-format-selector';

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = () => {
	const { t } = useTranslation();

	return (
		<MaterialDialogTitle id="list-dialog">
			{t('config.title')}
		</MaterialDialogTitle>
	);
};

const Config = () => {
	const [open, setOpen] = useRecoilState(configDialogState);

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const close = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={close}
			aria-labelledby={'config'}
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
			fullScreen={matches}
		>
			<DialogTitle />
			<DialogContent>
				<SwitchTheme />
				<AvatarClassSelector />
				<PaletteSelector />
				<DateFormatSelector />
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => {
						setOpen(false);
						window.location.reload(false);
					}}
					color="inherit"
				>
					<Trans i18nKey="config.exit">Exit</Trans>
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Config;
