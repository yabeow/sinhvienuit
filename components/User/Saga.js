import { put, take, takeLatest } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
    GET_USER_INFORMATION,
    setUserLoading,
    setUserError,
    getUserInformationResult,
    GET_USER_INFORMATION_RESULT,
    setUserInformation
} from './Action';
import { parseUserInformationFromHtml } from './Utils';

function* getUserInformationSaga() {
    try {
        yield put(setUserLoading(true));
        yield put(getPage('DAA', '/sinhvien/bang-dieu-khien', true, getUserInformationResult()));
        let data = yield take(GET_USER_INFORMATION_RESULT);
        if (data.endPoint !== '/sinhvien/bang-dieu-khien') return;
        //Request xảy ra lỗi.
        if (data.error) {
            yield put(setUserLoading(false));
            return yield put(setUserError(data.error));
        }
        let userInformation = parseUserInformationFromHtml(data.data);
        yield put(setUserInformation(userInformation));
    }
    catch(e) {
        alert(e.message);
        yield put(setUserError(e.message));
    }
    yield put(setUserLoading(false));
}

export default function* () {
    yield takeLatest(GET_USER_INFORMATION, getUserInformationSaga);
}
