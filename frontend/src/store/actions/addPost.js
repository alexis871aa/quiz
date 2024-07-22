import { ACTION_TYPE } from '../constants/index.js';

export const addPost = (data) => {
	return {
		type: ACTION_TYPE.ADD_POST,
		payload: data,
	};
};
