import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { testsReducer } from './reducers';
import { thunk } from './middleware';

const rootReducer = combineReducers({
	tests: testsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
