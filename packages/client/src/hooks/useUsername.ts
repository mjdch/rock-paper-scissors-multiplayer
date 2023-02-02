import { useState, useEffect } from 'react';

const USERNAME_KEY = 'username';

export const useUsername = () => {
	const [username, setUsername] = useState(undefined);

	const setAndSaveInLocalStorage = (value: string) => {
		window.localStorage.setItem(USERNAME_KEY, value);
		setUsername(value);
	};

	useEffect(() => {
		const localStorageValue = window.localStorage.getItem(USERNAME_KEY);
		if (localStorageValue) setUsername(localStorageValue);
	}, []);

	return [username, setAndSaveInLocalStorage];
};
