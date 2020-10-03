import React, { useState, useEffect, forwardRef } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { Trans, useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Picker } from 'emoji-mart';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle as MaterialDialogTitle,
	makeStyles,
	Popover,
	Slide,
	TextField,
	useTheme,
	useMediaQuery,
} from '@material-ui/core';
import 'emoji-mart/css/emoji-mart.css';

import { addList, updateList } from '../firebase';
import {
	materialThemeTypeState,
	currentUserState,
	listsState,
	listFormState,
} from '../recoil/atoms';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
	},
	emojiPicker: {
		display: 'grid',
		placeItems: 'end',
		marginRight: theme.spacing(2),
	},
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = ({ edit }) => {
	const { t } = useTranslation();

	return (
		<MaterialDialogTitle id="list-dialog">
			{edit ? t('form.list.editTitle') : t('form.list.addTitle')}
		</MaterialDialogTitle>
	);
};

const ListForm = () => {
	const listForm = useRecoilValue(listFormState);
	const [lists, setLists] = useRecoilState(listsState);
	const themeType = useRecoilValue(materialThemeTypeState);
	const currentUser = useRecoilValue(currentUserState);
	const resetListForm = useResetRecoilState(listFormState);
	const [anchorEl, setAnchorEl] = useState(null);
	const [chosenEmoji, setChosenEmoji] = useState(null);
	const { register, handleSubmit, reset, errors } = useForm();
	const { t } = useTranslation();

	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const edit = listForm && listForm.title;
	const listIcon = edit && listForm.listIcon;
	const classes = useStyles();

	const popupOpen = Boolean(anchorEl);
	const id = listForm !== null ? 'emoji-popover' : undefined;

	useEffect(() => {
		if (edit) {
			setChosenEmoji(listIcon);
		}
	}, [setChosenEmoji, edit, listIcon]);

	const handleEmojiPickerOpen = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleEmojiPickerClose = () => {
		setAnchorEl(null);
	};

	const onEmojiClick = (emoji) => {
		setChosenEmoji(emoji);
		handleEmojiPickerClose();
	};

	const close = () => {
		reset();
		setChosenEmoji(null);
		resetListForm();
	};

	const onSubmit = (data) => {
		const list = { ...data };
		list.listIcon = chosenEmoji;

		if (edit) {
			list.id = listForm.id;

			updateList(currentUser, list).catch((e) => console.log(e));
			setLists([...lists.filter((l) => l.id !== list.id), list]);
		} else {
			addList(currentUser, list)
				.then((id) => (list.id = id))
				.catch((e) => console.log(e));
			setLists([...lists, list]);
		}

		close();
	};

	return (
		<Dialog
			open={listForm !== null}
			onClose={close}
			aria-labelledby={
				edit ? t('form.list.editTitle') : t('form.list.addTitle')
			}
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
			fullScreen={matches}
		>
			<DialogTitle edit={edit} />
			<DialogContent>
				<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
					<div className={classes.emojiPicker}>
						<Button
							aria-describedby={id}
							variant="contained"
							disableElevation
							onClick={handleEmojiPickerOpen}
						>
							{chosenEmoji ? chosenEmoji.native : 'Emoji'}
						</Button>
						<Popover
							id={id}
							open={popupOpen}
							anchorEl={anchorEl}
							onClose={handleEmojiPickerClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
						>
							<Picker
								onSelect={onEmojiClick}
								theme={themeType}
								title={t('form.list.emoji')}
								emoji="smile"
							/>
						</Popover>
					</div>

					<TextField
						error={!!errors.title}
						defaultValue={edit ? listForm.title : ''}
						fullWidth
						helperText={errors.title ? t('form.list.titleRequired') : ''}
						id="title"
						inputRef={register({
							required: true,
						})}
						label={t('form.list.title')}
						margin="dense"
						name="title"
						required
						type="text"
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={resetListForm} color="inherit">
					<Trans i18nKey="form.list.cancel">Cancel</Trans>
				</Button>
				<Button
					onClick={handleSubmit(onSubmit)}
					color="primary"
					variant="contained"
				>
					{edit ? t('form.list.update') : t('form.list.create')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ListForm;
