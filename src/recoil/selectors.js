import { selector } from 'recoil';
import {
	currentFilterState,
	currentListState,
	materialThemePaletteState,
	materialThemeTypeState,
	tasksState,
} from './atoms';
import {
	filterImportant,
	filterDueToday,
	filterDueTomorrow,
	filterDueThisWeek,
	filterByList,
} from './filters';
import sortTasks from './sort';
import {
	main,
	mainDark,
	greenTheme,
	greenThemeDark,
	redTheme,
	redThemeDark,
	purpleTheme,
	purpleThemeDark,
} from '../theme';

const filteredTasksSelector = selector({
	key: 'filteredTasksSelector',
	get: ({ get }) => {
		const tasks = get(tasksState);
		const currentFilter = get(currentFilterState);
		const currentList = get(currentListState);

		let filteredTasks = [];

		switch (currentFilter) {
			case 'important':
				filteredTasks = filterImportant(tasks);
				break;
			case 'today':
				filteredTasks = filterDueToday(tasks);
				break;
			case 'tomorrow':
				filteredTasks = filterDueTomorrow(tasks);
				break;
			case 'week':
				filteredTasks = filterDueThisWeek(tasks);
				break;
			case 'list':
				filteredTasks = filterByList(tasks, currentList);
				break;
			default:
				filteredTasks = [...tasks];
		}

		return sortTasks(filteredTasks);
	},
});

const materialThemeSelector = selector({
	key: 'materialThemeSelector',
	get: ({ get }) => {
		const type = get(materialThemeTypeState);
		const palette = get(materialThemePaletteState);

		switch (palette) {
			case 'green':
				return type === 'dark' ? greenThemeDark : greenTheme;
			case 'red':
				return type === 'dark' ? redThemeDark : redTheme;
			case 'purple':
				return type === 'dark' ? purpleThemeDark : purpleTheme;
			default:
				return type === 'dark' ? mainDark : main;
		}
	},
});

export { filteredTasksSelector, materialThemeSelector };
