import { combineReducers } from 'redux';
//Reducers
import loginReducer from '../Login/Reducer';
import notificationReducer from '../Notification/Reducer';
import deadlineReducer from '../Deadline/Reducer';
import courseReducer from '../Course/Reducer';
import studentPointReducer from '../StudentPoint/Reducer';
import examReducer from '../Exam/Reducer';
import userReducer from '../User/Reducer';

//Kết hợp các reducers.
const appReducer = combineReducers({
    login: loginReducer,
    notifications: notificationReducer,
    deadlines: deadlineReducer,
    courses: courseReducer,
    studentPoints: studentPointReducer,
    exams: examReducer,
    user: userReducer
});

export default rootReducer = (state, action) => {
    if (action.type === 'LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
};