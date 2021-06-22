import {combineReducers} from 'redux';
import UserReducers from './UserReducers';
import PostsReducers from './PostsReducers';

// Combine all the reducers
const rootReducer = combineReducers({
  UserReducers,
  PostsReducers,
});

export default rootReducer;
