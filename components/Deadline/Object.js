const { Record, List } = require('immutable');
import { getTimeFormat } from '../../utils';
import { MOODLE_HOMEPAGE, MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';

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
    getAllDeadlines() {
        return this.listDeadlines.toArray();
    }
    getListId() {
        let returnList = {};
        this.listDeadlines.forEach(function(item) {
            returnList[item.getId()] = true;
        });
        return returnList;
    }
    getNumberOfDeadlines() {
        return this.listDeadlines.size;
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}