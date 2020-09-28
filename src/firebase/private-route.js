import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { currentUserState } from '../recoil/atoms';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
	const currentUser = useRecoilValue(currentUserState);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				!!currentUser ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={'/login'} />
				)
			}
		/>
	);
};

export default PrivateRoute;
