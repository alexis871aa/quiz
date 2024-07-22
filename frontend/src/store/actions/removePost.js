import { ACTION_TYPE } from '../constants/index.js';

export const removePost = (id) => {
	return {
		type: ACTION_TYPE.DELETE_POST,
		payload: id,
	};
};
