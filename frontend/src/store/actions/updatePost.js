import { ACTION_TYPE } from '../constants/index.js';

export const updatePost = (id, value) => {
	return {
		type: ACTION_TYPE.UPDATE_POST,
		payload: { id, value },
	};
};
