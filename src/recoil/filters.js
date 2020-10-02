import { isToday, isTomorrow, isThisWeek } from 'date-fns';

const filterImportant = (tasks) => {
	return tasks.filter((t) => t.fav);
};

const filterDueToday = (tasks) => {
	return tasks.filter((t) => isToday(new Date(t.dueDate)));
};

const filterDueTomorrow = (tasks) => {
	return tasks.filter((t) => isTomorrow(new Date(t.dueDate)));
};

const filterDueThisWeek = (tasks) => {
	return tasks.filter((t) => isThisWeek(new Date(t.dueDate)));
};

const filterByList = (tasks, listId) => {
	return tasks.filter((t) => t.project === listId);
};

export {
	filterImportant,
	filterDueToday,
	filterDueTomorrow,
	filterDueThisWeek,
	filterByList,
};
