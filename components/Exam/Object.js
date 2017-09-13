const { Record, List } = require('immutable');
import { getTimeFormat } from '../../utils';

const InitExam = new Record({
    code: false,
    time: false,
    room: false
});
export class Exam extends InitExam {
    constructor(data) {
        super(data);
    }
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
    error: false
});
export default class ListExam extends InitListExam {
    constructor(data) {
        super(data);
    }
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