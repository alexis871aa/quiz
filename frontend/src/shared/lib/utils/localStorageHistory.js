import { LOCAL_STORAGE_KEYS } from '../constants';

export const getTestHistories = () => {
	const history = localStorage.getItem(LOCAL_STORAGE_KEYS.TEST_HISTORY_KEY);
	return history ? JSON.parse(history) : [];
};

export const saveTestHistory = (test) => {
	const histories = getTestHistories();
	histories.push(test);
	localStorage.setItem(LOCAL_STORAGE_KEYS.TEST_HISTORY_KEY, JSON.stringify(histories));
};
