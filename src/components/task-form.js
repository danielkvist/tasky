import React, { forwardRef } from 'react';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { formatISO, format } from 'date-fns';
import { Trans, useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import {
	makeStyles,
	useMediaQuery,
	useTheme,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle as MaterialDialogTitle,
	TextField,
	Slide,
	MenuItem,
} from '@material-ui/core';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { addTask, updateTask } from '../firebase';
import {
	currentUserState,
	tasksState,
	taskFormState,
	dateFormatState,
} from '../recoil/atoms';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: theme.spacing(5),
	},
	due: {
		display: 'flex',
		gap: '1rem',
		justifyContent: 'center',
		marginTop: theme.spacing(3),
	},
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

const DialogTitle = ({ edit }) => {
	const { t } = useTranslation();

	return (
		<MaterialDialogTitle id="task-dialog">
			{edit ? t('form.task.editTitle') : t('form.task.addTitle')}
		</MaterialDialogTitle>
	);
};

const TaskForm = () => {
	const [tasks, setTasks] = useRecoilState(tasksState);
	const taskForm = useRecoilValue(taskFormState);
	const resetTaskForm = useResetRecoilState(taskFormState);
	const dateFormat = useRecoilValue(dateFormatState);
	const { t } = useTranslation();
	const currentUser = useRecoilValue(currentUserState);
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		control,
		errors,
	} = useForm();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const edit = taskForm && taskForm.id;
	const classes = useStyles();

	const close = () => {
		reset();
		resetTaskForm();
	};

	const onSubmit = (data) => {
		const task = { ...data };
		task.dueDate = formatISO(task.dueDate);

		if (edit) {
			task.id = taskForm.id;

			if (task.remindAt && !task.dueDate) {
				data.dueDate = formatISO(new Date());
			}

			updateTask(currentUser, task).catch((e) => console.log(e));
			setTasks([...tasks.filter((t) => t.id !== task.id), task]);
		} else {
			task.done = false;
			task.fav = false;

			if (task.remindAt && !task.dueDate) {
				task.dueDate = formatISO(new Date());
			}

			addTask(currentUser, task)
				.then((id) => (task.id = id))
				.catch((e) => console.log(e));
			setTasks([...tasks, task]);
		}

		close();
	};

	return (
		<Dialog
			open={taskForm !== null}
			onClose={close}
			aria-labelledby={
				edit ? t('form.task.editTitle') : t('form.task.addTitle')
			}
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
			fullScreen={matches}
		>
			<DialogTitle edit={edit} />
			<DialogContent>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={!!errors.title}
							defaultValue={edit ? taskForm.title : ''}
							fullWidth
							helperText={errors.title ? t('form.task.titleRequired') : ''}
							id="title"
							inputRef={register({
								required: true,
							})}
							label={t('form.task.title')}
							margin="dense"
							name="title"
							required
							type="text"
						/>

						<TextField
							fullWidth
							id="description"
							label={t('form.task.description')}
							defaultValue={edit ? taskForm.description : ''}
							multiline
							name="description"
							inputRef={register}
							type="text"
						/>

						<div className={classes.due}>
							<Controller
								as={
									<TextField
										fullWidth
										id="list"
										label={t('form.task.list')}
										name="list"
										type="text"
										InputLabelProps={{
											shrink: true,
										}}
										select
										inputRef={register}
									>
										<MenuItem value={'Inbox'}>Inbox</MenuItem>
									</TextField>
								}
								defaultValue={edit ? taskForm.project : 'Inbox'}
								control={control}
								name="project"
							/>

							<Controller
								as={
									<KeyboardDatePicker
										id="dueDate"
										disableToolbar
										label={t('form.task.dueDate')}
										name="dueDate"
										format={dateFormat}
										variant="inline"
										fullWidth
										onChange={(date) => setValue(date())}
										innerRef={register}
										inputRef={register}
										InputLabelProps={{
											shrink: true,
										}}
										KeyboardButtonProps={{
											'aria-label': 'change date',
										}}
									/>
								}
								defaultValue={edit ? taskForm.dueDate : new Date()}
								control={control}
								name="dueDate"
							/>

							<TextField
								id="remind"
								label={t('form.task.remindAt')}
								name="remindAt"
								type="time"
								fullWidth
								InputLabelProps={{
									shrink: true,
								}}
								inputProps={{
									step: 300,
								}}
								inputRef={register}
								defaultValue={
									edit
										? taskForm.remindAt
											? format(taskForm.remindAt, 'HH:mm')
											: ''
										: ''
								}
							/>
						</div>

						<div className={classes.due}>
							<Controller
								as={
									<TextField
										fullWidth
										id="repeat"
										label={t('form.task.repeat.title')}
										name="repeat"
										type="text"
										InputLabelProps={{
											shrink: true,
										}}
										select
										inputRef={register}
									>
										{[
											{
												value: 'never',
												text: t('form.task.repeat.neverRepeat'),
											},
											{
												value: 'everyDay',
												text: t('form.task.repeat.everyDay'),
											},
											{
												value: 'everyWeek',
												text: t('form.task.repeat.everyWeek'),
											},
											{
												value: 'everyMonth',
												text: t('form.task.repeat.everyMonth'),
											},
										].map((item) => {
											return (
												<MenuItem key={item.value} value={item.text}>
													{item.text}
												</MenuItem>
											);
										})}
									</TextField>
								}
								defaultValue="Never repeat"
								control={control}
								name="repeat"
							/>
						</div>
					</form>
				</MuiPickersUtilsProvider>
			</DialogContent>
			<DialogActions>
				<Button onClick={resetTaskForm} color="primary">
					<Trans i18nKey="form.task.cancel">Cancel</Trans>
				</Button>
				<Button onClick={handleSubmit(onSubmit)} color="primary">
					{edit ? t('form.task.update') : t('form.task.create')}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskForm;
