import app, { authGoogleProvider } from './firebase';
import { AuthProvider, AuthContext } from './auth';
import PrivateRoute from './private-route';

export default app;
export { app, authGoogleProvider, AuthProvider, AuthContext, PrivateRoute };
