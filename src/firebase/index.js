import app, { authGoogleProvider } from './firebase';
import AuthProvider from './auth';
import db, { fetchTasks } from './db';
import PrivateRoute from './private-route';

export default app;
export { app, db, authGoogleProvider, fetchTasks, AuthProvider, PrivateRoute };
