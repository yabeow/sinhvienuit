import { put, take, takeLatest } from 'redux-saga/effects';
import {
    setCourseLoading,
    addCourse,
    getCourseResult,
    setCourseError,
    GET_COURSE,
    GET_COURSE_RESULT
} from './Action';
import { getPage } from '../Login/Action';
import { parseCourseFromHtml } from './Utils';

function* getCourse() {
    try {
        yield put(setCourseLoading(true));
        yield put(getPage('DAA', '/ajax-block/tkb/ajax', true, getCourseResult()));
        let data = yield take(GET_COURSE_RESULT);
        if (data.endPoint !== '/ajax-block/tkb/ajax') return;
        //Xảy ra lỗi khi request.
        if (data.error !== false) {
            yield put(setCourseLoading(false));
            return yield put(setCourseError(data.error));
        }
        data.data = JSON.parse(data.data);
        let courses = parseCourseFromHtml(data.data[1]['data']);
        for(let course of courses) {
            yield put(addCourse(course));
        }
    }
    catch(e) {
        yield put(setCourseError(e.message));
    }
    yield put(setCourseLoading(false));
}

export default function* mySaga() {
    yield takeLatest(GET_COURSE, getCourse);
}