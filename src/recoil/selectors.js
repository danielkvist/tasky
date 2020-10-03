import { selector } from 'recoil';
import {
	tasksState,
	currentListState,
	currentFilterState,
	materialThemePaletteState,
	materialThemeTypeState,
} from './atoms';
import {
	filterImportant,
	filterDueToday,
	filterDueTomorrow,
	filterDueThisWeek,
	filterByList,
} from './filters';
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

		switch (currentFilter) {
			case 'important':
				return filterImportant(tasks);
			case 'today':
				return filterDueToday(tasks);
			case 'tomorrow':
				return filterDueTomorrow(tasks);
			case 'week':
				return filterDueThisWeek(tasks);
			case 'list':
				return filterByList(tasks, currentList);
			default:
				return tasks;
		}
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
