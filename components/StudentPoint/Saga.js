import { put, all, takeLatest, takeEvery } from 'redux-saga/effects';
import {
  addPoint,
  setFinalPoint,
  getPointResult,
  setPointLoading,
  setPointError,
  GET_STUDENT_POINT,
  GET_POINT_RESULT,
} from './Action';
import { getPage } from '../Login/Action';
import { parseStudentPointFromHtml, parseFinalStudentPointFromHtml } from './Utils';

function* getPointInformation(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setPointLoading(true));
      return yield put(getPage('DRL', '/sinhvien/renluyensinhvien/diemrenluyen', true, getPointResult()));
    }
    // Xảy ra lỗi khi request.
    if (data.error !== false) {
      return yield put(setPointError(data.error));
    }
    const finalPoint = parseFinalStudentPointFromHtml(data.data);
    if (finalPoint) {
      yield put(setFinalPoint(finalPoint));
    }
    const listPoints = parseStudentPointFromHtml(data.data);
    yield all(listPoints.map(item => put(addPoint(item))));
  } catch (e) {
    yield put(setPointError(e.message));
  } finally {
    yield put(setPointLoading(false));
  }
  return undefined;
}

export default function* () {
  yield takeLatest(GET_STUDENT_POINT, getPointInformation);
  yield takeEvery(GET_POINT_RESULT, getPointInformation);
}
