import app from './firebase';
import { formatISO } from 'date-fns';

const db = app.firestore();

const fetchTasks = async (userID) => {
	try {
		const data = await db.collection(`users/${userID}/tasks`).get();
		return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
	} catch (e) {
		throw new Error(e);
	}
};

const addTask = async (userID, task) => {
	try {
		const result = await db
			.collection(`users/${userID}/tasks`)
			.add({ ...task });

		return result.id;
	} catch (e) {
		throw new Error(e);
	}
};

const updateTask = async (userID, task) => {
	const timestamp = formatISO(new Date());
	try {
		const result = await db
			.collection(`users/${userID}/tasks`)
			.doc(task.id)
			.update({ ...task, lastModified: timestamp });

		return result;
	} catch (e) {
		throw new Error(e);
	}
};

const deleteTask = async (userID, task) => {
	try {
		const result = await db
			.collection(`users/${userID}/tasks`)
			.doc(task.id)
			.delete();

		return result;
	} catch (e) {
		throw new Error(e);
	}
};

export default db;
export { fetchTasks, addTask, updateTask, deleteTask };
