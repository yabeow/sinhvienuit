import { combineReducers } from 'redux';
//Reducers
import loginReducer from '../Login/Reducer';
import notificationReducer from '../Notification/Reducer';
import courseReducer from '../Course/Reducer';
import userReducer from '../User/Reducer';

//Kết hợp các reducers.
const appReducer = combineReducers({
    login: loginReducer,
    notifications: notificationReducer,
    courses: courseReducer,
    user: userReducer
});

export default rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};