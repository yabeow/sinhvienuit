import { put, all, take, takeLatest } from 'redux-saga/effects';
import {
  setExamLoading,
  addExam,
  getExamResult,
  setExamError,
  GET_EXAM,
  GET_EXAM_RESULT,
} from './Action';
import { getPage } from '../Login/Action';
import { parseExamFromHtml } from './Utils';

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
    yield all(exams.map(exam => put(addExam(exam))));
  } catch (e) {
    yield put(setExamError(e.message));
  }
  yield put(setExamLoading(false));
}

export default function* mySaga() {
  yield takeLatest(GET_EXAM, getExam);
}
