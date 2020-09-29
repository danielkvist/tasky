import { atom } from 'recoil';

const currentUserState = atom({
	key: 'currentUserState',
	default: null,
});

const pendingUserAuthState = atom({
	key: 'pendingUserAuthState',
	default: true,
});

const tasksState = atom({
	key: 'tasksState',
	default: [],
});

const tasksDoneState = atom({
	key: 'tasksDoneState',
	default: false,
});

const taskFormState = atom({
	key: 'taskFormState',
	default: null,
});

const drawerOpenState = atom({
	key: 'drawerOpenState',
	default: false,
});

const dateFormatState = atom({
	key: 'dateFormatState',
	default: 'MM/dd/yyyy',
});

const fetchTasksErrorState = atom({
	key: 'fetchTasksErrorState',
	default: null,
});

const materialThemeTypeState = atom({
	key: 'materialThemeTypeState',
	default: 'light',
});

export {
	currentUserState,
	pendingUserAuthState,
	tasksState,
	tasksDoneState,
	taskFormState,
	drawerOpenState,
	dateFormatState,
	fetchTasksErrorState,
	materialThemeTypeState,
};
