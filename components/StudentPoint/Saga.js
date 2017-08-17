import { put, take, takeLatest } from 'redux-saga/effects';
import {
    addPoint,
    setFinalPoint,
    getPointResult,
    setPointLoading,
    setPointError,
    GET_STUDENT_POINT,
    GET_POINT_RESULT
}
from './Action';
import { getPage } from '../Login/Action';
import { parseStudentPointFromHtml, parseFinalStudentPointFromHtml } from './Utils';

function* getPointInformation() {
    try {
        yield put(setPointLoading(true));
        yield put(getPage('DRL', '/sinhvien/renluyensinhvien/diemrenluyen', true, getPointResult()));
        let data = yield take(GET_POINT_RESULT);
        if (data.endPoint !== '/sinhvien/renluyensinhvien/diemrenluyen') return;
        //Xảy ra lỗi khi request.
        if (data.error !== false) {
            yield put(setPointLoading(false));
            return yield put(setPointError(data.error));
        }
        let finalPoint = parseFinalStudentPointFromHtml(data.data);
        yield put(setFinalPoint(finalPoint));
        let listPoints = parseStudentPointFromHtml(data.data);
        for(let point of listPoints) {
            yield put(addPoint(point));
        }
    }
    catch(e) {
        yield put(setPointError(e.message));
    }
    yield put(setPointLoading(false));
}

export default function* () {
    yield takeLatest(GET_STUDENT_POINT, getPointInformation);
}