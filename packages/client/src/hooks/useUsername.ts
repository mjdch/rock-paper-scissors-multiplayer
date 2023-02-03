import { useState, useEffect } from 'react';

const USERNAME_KEY = 'username';

export const useUsername = () => {
	const [username, setUsername] = useState('');

	const setAndSaveInLocalStorage = (value: string) => {
		window.localStorage.setItem(USERNAME_KEY, value);
		setUsername(value);
	};

	useEffect(() => {
		const localStorageValue = window.localStorage.getItem(USERNAME_KEY);
		if (localStorageValue) setUsername(localStorageValue);
		if (!localStorageValue) {
			const randomName = Math.random().toString(36).slice(2, 8);
			setAndSaveInLocalStorage(randomName);
		}
	}, []);

	return [username, setAndSaveInLocalStorage] as const;
};
