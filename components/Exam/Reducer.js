import ListExam from './Object';
import { reducerFromClass } from '../../utils';

export class ExamListReducer extends ListExam {
  ADD_EXAM({ exam }) {
    let dup = false;
    this.listExams.forEach((item) => {
      if (item.getCode() === exam.getCode()) {
        if (item.getTime('LLL') === exam.getTime('LLL')) {
          // Lịch thi bị trùng.
          dup = true;
          return true;
        }
      }
      return false;
    });
    if (dup) return this;
    const listExams = this.listExams.push(exam);
    return this.set('listExams', listExams);
  }
  SET_EXAM_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Gán lỗi.
  SET_EXAM_ERROR({ error }) {
    return this.set('error', error);
  }
}

export default reducerFromClass(ExamListReducer);
