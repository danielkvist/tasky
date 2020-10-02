import app, { authGoogleProvider } from './firebase';
import AuthProvider from './auth';
import db, {
	fetchTasks,
	fetchLists,
	addTask,
	addList,
	updateTask,
	updateList,
	deleteTask,
	deleteLists,
} from './db';
import PrivateRoute from './private-route';

export default app;
export {
	addList,
	addTask,
	app,
	authGoogleProvider,
	AuthProvider,
	db,
	deleteLists,
	deleteTask,
	fetchLists,
	fetchTasks,
	PrivateRoute,
	updateList,
	updateTask,
};
