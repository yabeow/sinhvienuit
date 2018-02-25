import { fork, all } from 'redux-saga/effects';
// Import Saga
import loginSaga from '../Login/Saga';
import notificationSaga from '../Notification/Saga';
import deadlineSaga from '../Deadline/Saga';
import courseSaga from '../Course/Saga';
import studentPointSaga from '../StudentPoint/Saga';
import examSaga from '../Exam/Saga';
import userSaga from '../User/Saga';

// Kết hợp các saga.
export default function* () {
  yield all([
    fork(loginSaga),
    fork(notificationSaga),
    fork(deadlineSaga),
    fork(courseSaga),
    fork(studentPointSaga),
    fork(examSaga),
    fork(userSaga),
  ]);
}
