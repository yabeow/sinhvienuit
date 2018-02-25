import { put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import { getPage } from '../Login/Action';
import {
  GET_USER,
  GET_USER_INFORMATION,
  GET_USER_PICTURE,
  setUserLoading,
  setUserError,
  getUserResult,
  GET_USER_RESULT,
  setUserInformation,
  setUserPicture,
} from './Action';
import { parseUserInformationFromHtml, parserUserPictureFromHtml } from './Utils';

function* getUser() {
  yield fork(getUserInformation);
  yield fork(getUserPicture);
}

function* getUserInformation(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setUserLoading(true));
      return yield put(getPage('DAA', '/sinhvien/bang-dieu-khien', true, getUserResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      return yield put(setUserError(data.error));
    }
    const userInformation = parseUserInformationFromHtml(data.data);
    yield put(setUserInformation(userInformation));
  } catch (e) {
    yield put(setUserError(e.message));
  } finally {
    yield put(setUserLoading(false));
  }
  return undefined;
}
function* getUserPicture(data = false) {
  try {
    if (typeof data.endPoint === 'undefined') {
      yield put(setUserLoading(true));
      return yield put(getPage('DAA', '/khaibaolylich', true, getUserResult()));
    }
    // Request xảy ra lỗi.
    if (data.error) {
      return yield put(setUserError(data.error));
    }
    const userPicture = parserUserPictureFromHtml(data.data);
    yield put(setUserPicture(userPicture));
  } catch (e) {
    yield put(setUserError(e.message));
  } finally {
    yield put(setUserLoading(false));
  }
  return undefined;
}
function* watchRequests(data) {
  if (data.endPoint === '/sinhvien/bang-dieu-khien') {
    return yield fork(getUserInformation, data);
  }
  if (data.endPoint === '/khaibaolylich') {
    return yield fork(getUserPicture, data);
  }
  return undefined;
}

export default function* () {
  yield takeLatest(GET_USER, getUser);
  yield takeLatest(GET_USER_INFORMATION, getUserInformation);
  yield takeLatest(GET_USER_PICTURE, getUserPicture);
  yield takeEvery(GET_USER_RESULT, watchRequests);
}
