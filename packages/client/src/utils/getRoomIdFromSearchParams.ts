const ROOM_ID_KEY = 'roomId';

export const getRoomIdFromSearchParams = (): string => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(ROOM_ID_KEY) || '';
};
