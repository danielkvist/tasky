import { selector } from 'recoil';
import { tasksState, currentListState, currentFilterState } from './atoms';
import {
	filterImportant,
	filterDueToday,
	filterDueTomorrow,
	filterDueThisWeek,
	filterByList,
} from './filters';

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

export { filteredTasksSelector };
