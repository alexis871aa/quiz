import { ACTION_TYPE } from '../constants';

export const loadTestsAsync = (dataTests) => {
	const { data: tests } = dataTests;

	return {
		type: ACTION_TYPE.LOAD_TESTS,
		payload: tests,
	};
};
