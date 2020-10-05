import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
	apiKey: 'AIzaSyAEvq52a3buH3mSzQGf9pTabuMw0B-ebS8',
	authDomain: 'tasky-8dba9.firebaseapp.com',
	databaseURL: 'https://tasky-8dba9.firebaseio.com',
	projectId: 'tasky-8dba9',
	storageBucket: 'tasky-8dba9.appspot.com',
	messagingSenderId: '569670655372',
});

const authGoogleProvider = new firebase.auth.GoogleAuthProvider();

export default app;
export { authGoogleProvider };
