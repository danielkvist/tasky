import { atom } from 'recoil';

const setupState = atom({
	key: 'setupState',
	default: false,
});

const currentUserState = atom({
	key: 'currentUserState',
	default: null,
});

const pendingUserAuthState = atom({
	key: 'pendingUserAuthState',
	default: true,
});

const userAvatarClassState = atom({
	key: 'userAvatarClassState',
	default: 'fenix',
});

const userLevelState = atom({
	key: 'userLevelState',
	default: 1,
});

const userExpState = atom({
	key: 'userExpState',
	default: 10,
});

const tasksState = atom({
	key: 'tasksState',
	default: [],
});

const listsState = atom({
	key: 'listsState',
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

const listFormState = atom({
	key: 'listFormState',
	default: null,
});

const configDialogState = atom({
	key: 'configDialogState',
	default: false,
});

const currentFilterState = atom({
	key: 'currentFilterState',
	default: 'today',
});

const currentListState = atom({
	key: 'currentListState',
	default: '',
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

const materialThemePaletteState = atom({
	key: 'materialThemePaletteState',
	default: 'main',
});

export {
	configDialogState,
	currentFilterState,
	currentListState,
	currentUserState,
	dateFormatState,
	drawerOpenState,
	fetchTasksErrorState,
	listFormState,
	listsState,
	materialThemePaletteState,
	materialThemeTypeState,
	pendingUserAuthState,
	setupState,
	taskFormState,
	tasksDoneState,
	tasksState,
	userAvatarClassState,
	userExpState,
	userLevelState,
};
