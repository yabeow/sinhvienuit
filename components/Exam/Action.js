export const GET_EXAM = 'GET_EXAM';
export const GET_EXAM_RESULT = 'GET_EXAM_RESULT';
export const ADD_EXAM = 'ADD_EXAM';
export const SET_EXAM_ERROR = 'SET_EXAM_ERROR';
export const SET_EXAM_LOADING = 'SET_EXAM_LOADING';

export function getExam() {
  return {
    type: GET_EXAM,
  };
}

// Hàm nhận dữ liệu trả về từ hàm fetch.
export function getExamResult(endPoint = false, data = false, error = false) {
  return {
    type: GET_EXAM_RESULT,
    endPoint,
    data,
    error,
  };
}

export function addExam(exam) {
  return {
    type: ADD_EXAM,
    exam,
  };
}

export function setExamError(error) {
  return {
    type: SET_EXAM_ERROR,
    error,
  };
}

export function setExamLoading(loading) {
  return {
    type: SET_EXAM_LOADING,
    loading,
  };
}
