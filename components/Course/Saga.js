import { put, call, all, take, takeLatest, takeEvery } from 'redux-saga/effects';
import { Toast } from 'native-base';
import {
  setCourseLoading,
  addCourse,
  ADD_COURSE_CALENDAR,
  addCourseCalendar,
  ADD_LIST_COURSE_CALENDAR,
  getCourseResult,
  setCourseError,
  GET_COURSE,
  GET_COURSE_RESULT,
} from './Action';
import { getPage } from '../Login/Action';
import { parseCourseFromHtml } from './Utils';
import { addCalendarEvent, getCalendarEvents } from '../../utils';

function* getCourse() {
  try {
    yield put(setCourseLoading(true));
    yield put(getPage('DAA', '/ajax-block/tkb/ajax', true, getCourseResult()));
    const data = yield take(GET_COURSE_RESULT);
    if (data.endPoint !== '/ajax-block/tkb/ajax') return;
    // Xảy ra lỗi khi request.
    if (data.error !== false) {
      throw data.error;
    }
    data.data = JSON.parse(data.data);
    const courses = parseCourseFromHtml(data.data[1].data);
    yield all(courses.map(course => put(addCourse(course))));
  } catch (e) {
    yield put(setCourseError(e.message));
  } finally {
    yield put(setCourseLoading(false));
  }
}

function* addCourseCalendarSaga({ course }) {
  try {
    const event = course.getEvent();
    const listDeviceEvent = yield call(getCalendarEvents, event.startDate, event.endDate);
    const index = listDeviceEvent.findIndex(item => item.title === event.title);
    if (index === -1) yield call(addCalendarEvent, event);
  } catch (e) {
    yield put(setCourseError(e.message));
  }
}

function* addListCourseCalendarSaga({ listCourses }) {
  try {
    yield all(listCourses.map(item => put(addCourseCalendar(item))));
    Toast.show({
      text: 'Thêm lịch học vào ứng dụng Lịch thành công',
      position: 'bottom',
      buttonText: 'Bỏ qua',
      type: 'success',
      duration: 10000,
    });
  } catch (e) {
    yield put(setCourseError(e.message));
    Toast.show({
      text: 'Thêm lịch học vào ứng dụng Lịch lỗi',
      position: 'bottom',
      buttonText: 'Bỏ qua',
      type: 'warning',
      duration: 10000,
    });
  }
}

export default function* mySaga() {
  yield takeLatest(GET_COURSE, getCourse);
  yield takeEvery(ADD_COURSE_CALENDAR, addCourseCalendarSaga);
  yield takeLatest(ADD_LIST_COURSE_CALENDAR, addListCourseCalendarSaga);
}
