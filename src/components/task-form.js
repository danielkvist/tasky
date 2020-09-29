import React, { forwardRef } from 'react';
import { formatISO } from 'date-fns';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
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

import { addTask } from '../firebase';
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
	const resetTaskForm = useResetRecoilState(taskFormState);
	const open = useRecoilValue(taskFormState);
	const dateFormat = useRecoilValue(dateFormatState);
	const currentUser = useRecoilValue(currentUserState);
	const { register, handleSubmit, reset, setValue, control, errors } = useForm({
		defaultValues: {},
	});
	const classes = useStyles();

	const close = () => {
		reset();
		resetTaskForm();
	};

	const onSubmit = (data) => {
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

		close();
	};

	return (
		<Dialog
			open={open !== null}
			onClose={close}
			aria-labelledby="Add task"
			TransitionComponent={Transition}
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle id="addTask">Add task</DialogTitle>
			<DialogContent>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
						<TextField
							error={!!errors.title}
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
								defaultValue="Inbox"
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
								defaultValue={new Date()}
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
										defaultValue="Never repeat"
										InputLabelProps={{
											shrink: true,
										}}
										select
										inputRef={register}
									>
										{[
											'Never repeat',
											'Repeat every day',
											'Repeat every week',
											'Repeat every month',
											'Repeat every year',
										].map((item) => {
											return (
												<MenuItem key={item} value={item}>
													{item}
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
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TaskForm;
