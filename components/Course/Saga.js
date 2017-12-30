import { put, all, take, takeLatest } from 'redux-saga/effects';
import {
  setCourseLoading,
  addCourse,
  getCourseResult,
  setCourseError,
  GET_COURSE,
  GET_COURSE_RESULT,
} from './Action';
import { getPage } from '../Login/Action';
import { parseCourseFromHtml } from './Utils';

function* getCourse() {
  try {
    yield put(setCourseLoading(true));
    yield put(getPage('DAA', '/ajax-block/tkb/ajax', true, getCourseResult()));
    const data = yield take(GET_COURSE_RESULT);
    if (data.endPoint !== '/ajax-block/tkb/ajax') return;
    // Xảy ra lỗi khi request.
    if (data.error !== false) {
      yield put(setCourseLoading(false));
      throw data.error;
    }
    data.data = JSON.parse(data.data);
    const courses = parseCourseFromHtml(data.data[1].data);
    yield all(courses.map(course => put(addCourse(course))));
  } catch (e) {
    yield put(setCourseError(e.message));
  }
  yield put(setCourseLoading(false));
}

export default function* mySaga() {
  yield takeLatest(GET_COURSE, getCourse);
}
