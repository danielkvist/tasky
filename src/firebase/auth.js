import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import app from './firebase';
import { currentUserState, pendingUserAuthState } from '../recoil/atoms';
import Loading from '../components/loading';

const AuthProvider = ({ children }) => {
	const [, setCurrentUser] = useRecoilState(currentUserState);
	const [pending, setPending] = useRecoilState(pendingUserAuthState);

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			setCurrentUser(user && user.uid);
			setPending(false);
		});
	});

	if (pending) {
		return <Loading />;
	}

	return <>{children}</>;
};

export default AuthProvider;
