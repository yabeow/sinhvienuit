import ListExam from './Object';
import { reducerFromClass } from '../../utils';

export class ExamListReducer extends ListExam {
    constructor(data) {
        super(data);
    }
    ADD_EXAM({ exam }) {
        for (let item of this.listExams) {
            if (item.getCode() === exam.getCode()) {
                if (item.getTime('LLL') === exam.getTime('LLL')) {
                    //Lịch thi bị trùng.
                    return this;
                }
            }
        }
        let listExams = this.listExams.push(exam);
        return this.set('listExams', listExams);
    }
    SET_EXAM_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    //Gán lỗi.
    SET_EXAM_ERROR({ error }) {
        return this.set('error', error);
    }
}

export default reducerFromClass(ExamListReducer);