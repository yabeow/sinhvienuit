import { put, call, all, take, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  setExamLoading,
  addExam,
  addExamSaga,
  getExamResult,
  setExamError,
  GET_EXAM,
  GET_EXAM_RESULT,
  ADD_EXAM_SAGA,
} from './Action';
import { getPage } from '../Login/Action';
import { parseExamFromHtml } from './Utils';
import { addCalendarEvent, getCalendarEvents } from '../../utils';

function* getExam() {
  try {
    yield put(setExamLoading(true));
    yield put(getPage('DAA', '/ajax-block/lichthi/ajax', true, getExamResult()));
    const data = yield take(GET_EXAM_RESULT);
    if (data.endPoint !== '/ajax-block/lichthi/ajax') return;
    // Xảy ra lỗi khi request.
    if (data.error !== false) {
      yield put(setExamLoading(false));
      throw data.error;
    }
    data.data = JSON.parse(data.data);
    const exams = parseExamFromHtml(data.data[1].data);
    yield all(exams.map(exam => put(addExamSaga(exam))));
  } catch (e) {
    yield put(setExamError(e.message));
  }
  yield put(setExamLoading(false));
}

function* sagaAddExam(action) {
  try {
    let { exam } = action;
    const event = exam.getEvent();
    const listDeviceEvent = yield call(getCalendarEvents, event.startDate, event.endDate);
    const index = listDeviceEvent.findIndex(item => item.title === event.title && item.localtion === event.localtion);
    if (index === -1) {
      const eventId = yield call(addCalendarEvent, event);
      exam = exam.set('eventId', eventId);
    } else {
      exam = exam.set('eventId', listDeviceEvent[index].id);
    }
    yield put(addExam(exam));
  } catch (e) {
    yield put(setExamError(e.message));
  }
}

export default function* mySaga() {
  yield takeLatest(GET_EXAM, getExam);
  yield takeEvery(ADD_EXAM_SAGA, sagaAddExam);
}
