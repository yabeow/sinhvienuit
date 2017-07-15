import { fork, all } from 'redux-saga/effects';
//Import Saga
import loginSaga from '../Login/Saga';
import notificationSaga from '../Notification/Saga';
import courseSaga from '../Course/Saga';
import userSaga from '../User/Saga';

//Kết hợp các saga.
export default function* () {
    yield all([
        fork(loginSaga),
        fork(notificationSaga),
        fork(courseSaga),
        fork(userSaga)
    ]);
};