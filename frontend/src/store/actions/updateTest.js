import { ACTION_TYPE } from '../constants';

export const updateTest = (id, value) => {
	return {
		type: ACTION_TYPE.UPDATE_POST,
		payload: { id, value },
	};
};
