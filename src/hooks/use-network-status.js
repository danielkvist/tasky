import { useState, useEffect } from 'react';

const useNetworkStatus = () => {
	const [network, setStoredValue] = useState(true);
	const updateNetwork = () => setStoredValue(window.navigator.onLine);

	useEffect(() => {
		window.addEventListener('offline', updateNetwork);
		window.addEventListener('online', updateNetwork);

		return () => {
			window.removeEventListener('offline', updateNetwork);
			window.removeEventListener('online', updateNetwork);
		};
	}, [setStoredValue]);

	return network;
};

export default useNetworkStatus;
