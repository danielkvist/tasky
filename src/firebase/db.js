import app from './firebase';

const db = app.firestore();

const fetchTasks = async (userID) => {
	try {
		let data = await db.collection(`users/${userID}/tasks`).get();
		return data.docs.map((doc) => doc.data());
	} catch (e) {
		throw new Error(e);
	}
};

export default db;
export { fetchTasks };
