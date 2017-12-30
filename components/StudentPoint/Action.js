export const GET_STUDENT_POINT = 'GET_STUDENT_POINT';
export const GET_POINT_RESULT = 'GET_POINT_RESULT';
export const ADD_POINT = 'ADD_POINT';
export const SET_FINAL_POINT = 'SET_FINAL_POINT';
export const SET_POINT_LOADING = 'SET_POINT_LOADING';
export const SET_POINT_ERROR = 'SET_POINT_ERROR';

export function getStudentPoint() {
  return {
    type: GET_STUDENT_POINT,
  };
}

export function addPoint(point) {
  return {
    type: ADD_POINT,
    point,
  };
}

// Set điểm tổng kết rèn luyện.
export function setFinalPoint(point) {
  return {
    type: SET_FINAL_POINT,
    point,
  };
}

// Hàm nhận dữ liệu trả về từ hàm fetch.
export function getPointResult(endPoint = false, data = false, error = false) {
  return {
    type: GET_POINT_RESULT,
    endPoint,
    data,
    error,
  };
}

export function setPointLoading(loading) {
  return {
    type: SET_POINT_LOADING,
    loading,
  };
}

export function setPointError(error) {
  return {
    type: SET_POINT_ERROR,
    error,
  };
}
