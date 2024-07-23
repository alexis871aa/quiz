import { ACTION_TYPE } from '../constants';
import { loadTestsAsync } from '../actions';
import axios from 'axios';

const initialState = {
	tests: [],
	isLoading: false,
	error: null,
};

export const testsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOAD_TESTS:
			return {
				...state,
				tests: state.tests.concat(payload),
				isLoading: false,
			};
		case ACTION_TYPE.LOAD_REQUESTED:
			return {
				...state,
				isLoading: true,
			};
		case ACTION_TYPE.TESTS_REQUESTED_FAILED:
			return {
				...state,
				posts: [],
				isLoading: false,
				error: payload,
			};
		default:
			return state;
	}
};

export const loadTests = (args) => async (dispatch) => {
	dispatch({ type: ACTION_TYPE.LOAD_REQUESTED });
	try {
		const response = await axios.get('http://localhost:3001/api/tests');
		dispatch(loadTestsAsync(response.data));
	} catch (error) {
		dispatch({ type: ACTION_TYPE.TESTS_REQUESTED_FAILED, payload: error.message });
	}
};
