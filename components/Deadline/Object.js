import Moment from 'moment';
import { getTimeFormat } from '../../utils';
import { MOODLE_HOMEPAGE, MOODLE_DEADLINE_LINK_TEMPLATE } from '../../config/config';

const { Record, List } = require('immutable');
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
  code: '',
  title: '',
  content: '',
  time: false,
  status: false,
});
export class Deadline extends InitDeadline {
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
  getContent() {
    return this.content;
  }
  getTime(format = false, utc = false) {
    return getTimeFormat(this.time, format, utc);
  }
  getStatus() {
    const now = Moment();
    const time = Moment(this.getTime());
    if (time <= now && this.status === 0) return -1;
    return this.status;
  }
  getEvent() {
    const title = this.getTitle();
    const time = Moment(this.getTime());
    const preTime = Moment(this.getTime());
    // Strip all html tags
    const notes = this.getContent().replace(/<{1}[^<>]{1,}>{1}/g, '');
    // Thông báo trước 3 tiếng
    preTime.add(-3, 'hours');
    return {
      title: `${title} - ${this.getCode()}`,
      startDate: getTimeFormat(preTime.toISOString(), 'YYYY-MM-DD[T]HH:mm:00.[000Z]', true),
      endDate: getTimeFormat(time.toISOString(), 'YYYY-MM-DD[T]HH:mm:00.[000Z]', true),
      url: this.getLink(),
      notes,
      description: notes,
    };
  }
}
const InitDeadlineList = Record({
  listDeadlines: List(),
  loading: false,
  error: '',
});
export default class DeadlineList extends InitDeadlineList {
  getAllDeadlines() {
    return this.listDeadlines.toArray();
  }
  getDeadlines(code) {
    if (code) {
      return this.listDeadlines.filter(item => item.getCode() === code).toArray();
    }
    return this.listDeadlines.toArray();
  }
  getListId() {
    const returnList = {};
    this.listDeadlines.forEach((item) => {
      returnList[item.getId()] = true;
    });
    return returnList;
  }
  getListIdArray() {
    return this.listDeadlines.map(item => item.getId());
  }
  getNumberOfDeadlines(code = false, data = false) {
    let count = 0;
    let countData;
    if (data) {
      countData = data;
    } else {
      countData = this.listDeadlines;
    }
    countData.forEach((item) => {
      if (item.status === 0) {
        if (code) {
          if (code === item.getCode()) {
            count += 1;
          }
        } else {
          count += 1;
        }
      }
    });
    return count;
  }
  getNumberOfDeadlinesList() {
    const returnList = {};
    this.listDeadlines.forEach((item) => {
      if (item.status === 0) {
        if (Object.prototype.hasOwnProperty.call(returnList, item.getCode())) {
          returnList[item.getCode()] += 1;
        } else {
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
