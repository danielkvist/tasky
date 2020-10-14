const sortTasks = (tasks) => {
	return [...tasks].sort((a, b) => {
		if (a.fav) return -1;
		else return 1;
	});
};

export default sortTasks;
