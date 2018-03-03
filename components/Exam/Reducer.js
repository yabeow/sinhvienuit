import { List } from 'immutable';
import ListExam from './Object';
import { reducerFromClass } from '../../utils';

export class ExamListReducer extends ListExam {
  ADD_EXAM({ exam }) {
    let dup = false;
    let listExams = new List(this.listExams.map((item) => {
      if (item.getCode() === exam.getCode()) {
        dup = true;
        return exam;
      }
      return item;
    }));
    if (!dup) {
      listExams = this.listExams.push(exam);
    }
    return this.set('listExams', listExams);
  }
  SET_EXAM_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Gán lỗi.
  SET_EXAM_ERROR({ error }) {
    return this.set('error', error).set('loading', false);
  }
}

export default reducerFromClass(ExamListReducer);
