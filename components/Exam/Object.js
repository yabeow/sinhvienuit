import { getTimeFormat } from '../../utils';

const { Record, List } = require('immutable');

const InitExam = new Record({
  code: '',
  time: false,
  room: '',
});
export class Exam extends InitExam {
  getCode() {
    return this.code;
  }
  getTime(format = false) {
    return getTimeFormat(this.time, format);
  }
  getRoom() {
    return this.room;
  }
}
const InitListExam = new Record({
  listExams: List(),
  loading: false,
  error: '',
});
export default class ListExam extends InitListExam {
  getExams() {
    return this.listExams.toArray();
  }
  getLoading() {
    return this.loading;
  }
  getError() {
    return this.error;
  }
}
