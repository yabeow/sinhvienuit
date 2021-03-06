import { getTimeFormat } from '../../utils';

const { Record, List } = require('immutable');

const InitExam = new Record({
  code: '',
  time: false,
  room: '',
  eventId: '',
});
export class Exam extends InitExam {
  constructor(data) {
    const dataFix = data;
    // Convert time from string to datetime.
    if (typeof data.time === 'string') {
      dataFix.time = new Date(Date.parse(dataFix.time));
    }
    super(dataFix);
  }
  getCode() {
    return this.code;
  }
  getTime(format = false, utc = false) {
    return getTimeFormat(this.time, format, utc);
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
      startDate: this.getTime('YYYY-MM-DD[T]HH:mm:00.000[Z]', true),
      endDate: this.getTime('YYYY-MM-DD[T]HH:mm:00.000[Z]', true),
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
