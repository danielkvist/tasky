import app, { authGoogleProvider } from './firebase';
import AuthProvider from './auth';
import db, { fetchTasks, addTask, updateTask, deleteTask } from './db';
import PrivateRoute from './private-route';

export default app;
export {
	addTask,
	app,
	authGoogleProvider,
	AuthProvider,
	db,
	deleteTask,
	fetchTasks,
	PrivateRoute,
	updateTask,
};
