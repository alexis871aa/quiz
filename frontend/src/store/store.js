import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { postReducer } from './reducers';
import { thunk } from './middleware';

const rootReducer = combineReducers({
	post: postReducer,
	// user: userReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
