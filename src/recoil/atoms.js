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
	fetchTasksErrorState,
	materialThemeTypeState,
};
