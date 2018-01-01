import ListExam from './Object';
import { reducerFromClass } from '../../utils';

export class ExamListReducer extends ListExam {
  ADD_EXAM({ exam }) {
    const index = this.listExams.findIndex(item => item.getCode() === exam.getCode() && item.getTime('LLL') === exam.getTime('LLL'));
    if (index !== -1) return this;
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
