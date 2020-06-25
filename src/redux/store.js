import {applyMiddleware, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
//import hackerReducer from './reducers/TopStoriesReducer';
import hackerReducer from './reducers'

export const store = createStore(hackerReducer, {}, applyMiddleware(ReduxThunk));