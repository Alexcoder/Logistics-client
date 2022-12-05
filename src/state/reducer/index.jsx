import {combineReducers} from 'redux';
import auth from './auth';
import posts from './posts';
import booking from './booking';


const reducer = combineReducers({auth, posts, booking})
export default reducer;