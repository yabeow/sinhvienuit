const { Record, List } = require('immutable');
import { getTimeFormat } from '../../utils';
import { MOODLE_HOMEPAGE, MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';

/*
    id: Id deadline.
    code: Mã môn học có deadline.
    title: Tiêu đề.
    content: Nội dung deadline.
    time: Hạn chót.
    status: Tình trạng deadline (-1: Đã hết hạn, 0: chưa nộp, 1: đã nộp).
 */

const InitDeadline = Record({
    id: false,
    code: false,
    title: false,
    content: false,
    time: false,
    status: false
});
export class Deadline extends InitDeadline {
    constructor(data) {
        super(data);
    }
    getId() {
        return this.id;
    }
    getCode() {
        return this.code;
    }
    getLink() {
        return MOODLE_HOMEPAGE + MOODLE_DEADLINE_LINK_TEMPLATE + this.id;
    }
    getTitle() {
        return this.title;
    }
    getTime(format = false) {
        if (format) {
            return getTimeFormat(this.time, format);
        }
        return this.time;
    }
    getStatus() {
        return this.status;
    }
}
const InitDeadlineList = Record({
    listDeadlines: List(),
    loading: false,
    error: false
});
export default class DeadlineList extends InitDeadlineList {
    constructor(data) {
        super(data);
    }
    getDeadlines(code) {
        if (code) {
            return this.listDeadlines.filter(function(item) {
                return item.getCode() === code;
            }).toArray();
        }
        return this.listDeadlines.toArray();
    }
    getListId() {
        let returnList = {};
        this.listDeadlines.forEach(function(item) {
            returnList[item.getId()] = true;
        });
        return returnList;
    }
    getNumberOfDeadlines(code = false, data = false) {
        let count = 0;
        let countData;
        if (data) {
            countData = data;
        }
        else {
            countData = this.listDeadlines;
        }
        countData.forEach(function(item) {
            if (item.status === 0) {
                if (code) {
                    if (code === item.getCode()) {
                        count++;
                    }
                }
                else {
                    count++;
                }
            }
        });
        return count;
    }
    getNumberOfDeadlinesList() {
        let returnList = {};
        this.listDeadlines.map(function(item) {
            if (item.status === 0) {
                if (returnList.hasOwnProperty(item.getCode())) {
                    returnList[item.getCode()]++;
                }
                else {
                    returnList[item.getCode()] = 1;
                }
            }
        });
        return returnList;
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}