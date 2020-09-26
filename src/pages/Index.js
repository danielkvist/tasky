import React from 'react';

import app from '../firebase';

const Home = () => {
	return (
		<>
			<h1>Welcome</h1>
			<button onClick={() => app.auth().signOut()}>Sign out</button>
		</>
	);
};

export default Home;
