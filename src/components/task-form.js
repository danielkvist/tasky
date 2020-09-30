import React, { forwardRef } from 'react';
import { formatISO, format } from 'date-fns';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { useForm, Controller } from 'react-hook-form';
import {
	makeStyles,
	useMediaQuery,
	useTheme,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
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

const TaskForm = () => {
	const [tasks, setTasks] = useRecoilState(tasksState);
	const taskForm = useRecoilValue(taskFormState);
	const resetTaskForm = useResetRecoilState(taskFormState);
	const open = useRecoilValue(taskFormState);
	const dateFormat = useRecoilValue(dateFormatState);
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
		if (edit) {
			data.dueDate = formatISO(data.dueDate);
			data.id = taskForm.id;

			if (data.remindAt && !data.dueDate) {
				data.dueDate = formatISO(new Date());
			}

			updateTask(currentUser, data).catch((e) => console.log(e));
			setTasks([...tasks.filter((task) => task.id !== data.id), data]);
		} else {
			data.dueDate = formatISO(data.dueDate);
			data.done = false;
			data.fav = false;

			if (data.remindAt && !data.dueDate) {
				data.dueDate = formatISO(new Date());
			}

			addTask(currentUser, data)
				.then((id) => (data.id = id))
				.catch((e) => console.log(e));
			setTasks([...tasks, data]);
		}

		close();
	};

	return (
		<Dialog
			open={open !== null}
			onClose={close}
			aria-labelledby={edit ? 'Edit task' : 'Add task'}
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
			fullScreen={matches}
		>
			<DialogTitle id={edit ? 'edit-task' : 'add-task'}>
				{edit ? 'Edit Task' : 'Add Task'}
			</DialogTitle>
			<DialogContent>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={!!errors.title}
							defaultValue={edit ? taskForm.title : ''}
							fullWidth
							helperText={errors.title ? 'Task title is required' : ''}
							id="title"
							inputRef={register({
								required: true,
							})}
							label="Title"
							margin="dense"
							name="title"
							required
							type="text"
						/>
						<TextField
							fullWidth
							id="description"
							label="Description"
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
										label="List"
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
										label="Due date"
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
								label="Remind At"
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
										label="Repeat"
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
												value: 'Never repeat',
												text: 'Never repeat',
											},
											{
												value: 'Every day',
												text: 'Every day',
											},
											{
												value: 'Every week',
												text: 'Every week',
											},
											{
												value: 'Every month',
												text: 'Every month',
											},
											{
												value: 'Never repeat',
												text: 'Never repeat',
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
					Cancel
				</Button>
				<Button onClick={handleSubmit(onSubmit)} color="primary">
					{edit ? 'Update' : 'Create'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskForm;
