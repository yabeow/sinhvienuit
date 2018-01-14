import { call, put, all, select, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
  setNotificationLoading,
  GET_NOTIFICATION,
  GET_GENERAL_NOTIFICATION,
  GET_COURSE_NOTIFICATION,
  getNotificationResult,
  GET_NOTIFICATION_RESULT,
  setNotificationError,
  addGeneralNotification,
  addCourseNotification,
  ADD_COURSE_NOTIFICATION_SAGA,
  addCourseNotificationSaga,
} from './Action';
import {
  parseDaaGeneralNotificationFromHtml,
  parseOepGeneralNotificationFromHtml,
  parseDaaCourseNotificationFromHtml,
  parseOepCourseNotificationFromHtml,
} from './Utils';

import { addCalendarEvent, getCalendarEvents } from '../../utils';

// Fetch tất cả thông báo.
function* getNotification() {
  yield call(getCourseNotification, {});
  yield call(getGeneralNotification, {});
}

// Fetch thông báo chung.
function* getGeneralNotification() {
  yield call(getGeneralDaaNotification, {});
  yield call(getGeneralOepNotification, {});
}

// Fetch thông báo chung từ DAA.
function* getGeneralDaaNotification(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setNotificationLoading(true));
      return yield put(getPage('DAA', '/thong-bao-chung', false, getNotificationResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      yield put(setNotificationLoading(false));
      return yield put(setNotificationError(data.error));
    }
    const notifications = parseDaaGeneralNotificationFromHtml(data.data);
    yield all(notifications.map(item => put(addGeneralNotification(item))));
  } catch (e) {
    yield put(setNotificationError(e.message));
  }
  return yield put(setNotificationLoading(false));
}

// Fetch thông báo chung từ OEP.
function* getGeneralOepNotification(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setNotificationLoading(true));
      return yield put(getPage('OEP', '/vi', false, getNotificationResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      yield put(setNotificationLoading(false));
      return yield put(setNotificationError(data.error));
    }
    const notifications = parseOepGeneralNotificationFromHtml(data.data);
    yield all(notifications.map(item => put(addGeneralNotification(item))));
  } catch (e) {
    yield put(setNotificationError(e.message));
  }
  return yield put(setNotificationLoading(false));
}

// Fetch thông báo môn học.
function* getCourseNotification() {
  yield call(getCourseOepNotification, {});
  yield call(getCourseDaaNotification, {});
}

// Fetch thông báo môn học từ DAA.
function* getCourseDaaNotification(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setNotificationLoading(true));
      return yield put(getPage('DAA', '/thong-bao-nghi-bu', false, getNotificationResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      yield put(setNotificationLoading(false));
      return yield put(setNotificationError(data.error));
    }
    const notifications = parseDaaCourseNotificationFromHtml(data.data);
    const listCoursesCode = yield select(state => state.courses.getListOfCoursesCode());
    yield all(notifications.map((item) => {
      if (typeof listCoursesCode[item.getCode()] !== 'undefined') {
        return put(addCourseNotificationSaga(item));
      }
      return () => {};
    }));
  } catch (e) {
    yield put(setNotificationError(e.message));
  }
  return yield put(setNotificationLoading(false));
}

// Fetch thông báo môn học từ OEP.
function* getCourseOepNotification(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setNotificationLoading(true));
      yield put(getPage('OEP', '/thong-bao-nghi-hoc-hoc-bu?page=0', false, getNotificationResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      yield put(setNotificationLoading(false));
      return yield put(setNotificationError(data.error));
    }
    const notifications = parseOepCourseNotificationFromHtml(data.data);
    const listCoursesCode = yield select(state => state.courses.getListOfCoursesCode());
    yield all(notifications.map((item) => {
      if (typeof listCoursesCode[item.getCode()] !== 'undefined') {
        return put(addCourseNotificationSaga(item));
      }
      return () => {};
    }));
  } catch (e) {
    yield put(setNotificationError(e.message));
  }
  return yield put(setNotificationLoading(false));
}

function* sagaAddCourseNotification(action) {
  try {
    let { notification } = action;
    const event = notification.getEvent();
    const listDeviceEvent = yield call(getCalendarEvents, event.startDate, event.endDate);
    const index = listDeviceEvent.findIndex(item => item.title === event.title && item.localtion === event.localtion);
    if (index === -1) {
      const eventId = yield call(addCalendarEvent, event);
      notification = notification.set('eventId', eventId);
    } else {
      notification = notification.set('eventId', listDeviceEvent[index].id);
    }
    yield put(addCourseNotification(notification));
  } catch (e) {
    yield put(setNotificationError(e.message));
  }
}

function* watchRequests(data) {
  if (typeof data.endPoint !== 'undefined') {
    switch (data.endPoint) {
      case '/thong-bao-chung':
        return yield fork(getGeneralDaaNotification, data);
      case '/vi':
        return yield fork(getGeneralOepNotification, data);
      case '/thong-bao-nghi-bu':
        return yield fork(getCourseDaaNotification, data);
      case '/thong-bao-nghi-hoc-hoc-bu?page=0':
        return yield fork(getCourseOepNotification, data);
      default:
        return false;
    }
  }
  return true;
}

export default function* () {
  yield takeLatest(GET_NOTIFICATION, getNotification);
  yield takeLatest(GET_GENERAL_NOTIFICATION, getGeneralNotification);
  yield takeLatest(GET_COURSE_NOTIFICATION, getCourseNotification);
  yield takeEvery(GET_NOTIFICATION_RESULT, watchRequests);
  yield takeEvery(ADD_COURSE_NOTIFICATION_SAGA, sagaAddCourseNotification);
}
