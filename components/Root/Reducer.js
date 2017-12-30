import { combineReducers } from "redux";
//Reducers
import introReducer from "../Intro/Reducer";
import loginReducer from "../Login/Reducer";
import notificationReducer from "../Notification/Reducer";
import deadlineReducer from "../Deadline/Reducer";
import courseReducer from "../Course/Reducer";
import studentPointReducer from "../StudentPoint/Reducer";
import examReducer from "../Exam/Reducer";
import userReducer from "../User/Reducer";

//Kết hợp các reducers.
const appReducer = combineReducers({
  firstTime: introReducer,
  login: loginReducer,
  notifications: notificationReducer,
  deadlines: deadlineReducer,
  courses: courseReducer,
  studentPoints: studentPointReducer,
  exams: examReducer,
  user: userReducer,
});

export default (rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = { firstTime: false };
  }

  return appReducer(state, action);
});
