import { ACTION_TYPE } from '../constants';
import { loadTestsAsync } from '../actions';
import axios from 'axios';

const initialState = {
	posts: [],
	isLoading: false,
	error: null,
};

export const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.ADD_POST:
			return {
				...state,
				posts: state.posts.concat({ title: payload, id: Math.random() }),
			};
		case ACTION_TYPE.UPDATE_POST:
			return {
				...state,
				posts: state.posts.toSpliced(
					state.posts.findIndex((post) => post.id === payload.id),
					1,
					{
						title: payload.value,
						id: payload.id,
					},
				),
			};
		case ACTION_TYPE.DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== payload),
			};
		case ACTION_TYPE.LOAD_TESTS:
			return {
				...state,
				posts: state.posts.concat(payload),
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

export const loadTests = (args) => async (dispatch, getState) => {
	dispatch({ type: ACTION_TYPE.LOAD_REQUESTED });
	try {
		const { response } = await axios.get('https://localhost:3001/api/tests');
		dispatch(loadTestsAsync(response.data));
	} catch (error) {
		dispatch({ type: ACTION_TYPE.TESTS_REQUESTED_FAILED, payload: error.message });
	}
};
