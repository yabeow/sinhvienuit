import { getTimeFormat } from '../../utils';

const { Record, List } = require('immutable');

const InitExam = new Record({
  code: '',
  time: false,
  room: '',
  eventId: '',
});
export class Exam extends InitExam {
  getCode() {
    return this.code;
  }
  getTime(format = false) {
    return getTimeFormat(this.time, format);
  }
  getEndTime(format = false) {
    // Vì không có thông tin nên mặc định thời gian thì là 1h.
    return getTimeFormat(this.time.setHours(this.time.getHours() + 1), format);
  }
  getRoom() {
    return this.room;
  }
  getEventId() {
    return this.eventId;
  }
  getEvent() {
    return {
      title: `Thi môn ${this.getCode()}`,
      location: this.getRoom(),
      startDate: this.getTime('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
      endDate: this.getEndTime('YYYY-MM-DD[T]HH:mm:ss.sss[Z]'),
    };
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
