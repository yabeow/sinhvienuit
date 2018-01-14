import { getTimeFormat } from '../../utils';
import {
  DAA_COURSE_NOTIFICATION_LINK_TEMPLATE,
  OEP_COURSE_NOTIFICATION_LINK_TEMPLATE,
} from '../../config/config';

const { Record, List } = require('immutable');
/*
    source: Nguồn thông báo. VD: DAA, OEP,...
    id: Id thông báo.
    title: Tiêu đề thông báo.
    link: Link thông báo.
    content: Nội dung thông báo.
    createTime: Giờ đăng.
    isNotified: Người dùng đọc thông báo hay chưa?
 */
const InitGeneralNotification = Record({
  source: '',
  id: false,
  title: '',
  link: '',
  content: '',
  createTime: false,
  isNotified: false,
});
export class GeneralNotification extends InitGeneralNotification {
  constructor(data) {
    const fixData = data;
    if (typeof fixData.createTime === 'string') {
      fixData.createTime = new Date(Date.parse(fixData.createTime));
    }
    super(fixData);
  }
  getSource() {
    return this.source;
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getLink() {
    return this.link;
  }
  getContent() {
    return this.content;
  }
  getCreateTime(format = false) {
    return getTimeFormat(this.createTime, format);
  }
}

/*
    type: Loại thông báo: 1: Học bù. 2: Được nghỉ. 3: Đổi phòng học.
    source: Nguồn thông báo.
    id: Mã thông báo.
    code: Mã môn học.
    title: Tiêu đề thông báo.
    startTime: Thời gian bắt đầu.
    endTime: Thời gian kết thúc.
    room: Phòng học.
    createTime: Giờ đăng.
 */
const InitCourseNotification = Record({
  type: '',
  source: '',
  id: false,
  code: '',
  title: '',
  startTime: false,
  endTime: false,
  room: '',
  createTime: false,
  eventId: '',
});
export class CourseNotification extends InitCourseNotification {
  constructor(data) {
    const fixData = data;
    if (typeof fixData.startTime === 'string') {
      fixData.startTime = new Date(Date.parse(fixData.startTime));
    }
    if (typeof fixData.endTime === 'string') {
      fixData.endTime = new Date(Date.parse(fixData.endTime));
    }
    if (typeof fixData.createTime === 'string') {
      fixData.createTime = new Date(Date.parse(fixData.createTime));
    }
    super(fixData);
  }
  getType() {
    return this.type;
  }
  getSource() {
    return this.source;
  }
  getId() {
    return this.id;
  }
  getCode() {
    return this.code;
  }
  getTitle() {
    return this.title;
  }
  getStartTime(format = false, utc = false) {
    return getTimeFormat(this.startTime, format, utc);
  }
  getEndTime(format = false, utc = false) {
    return getTimeFormat(this.endTime, format, utc);
  }
  getRoom() {
    return this.room;
  }
  getCreateTime(format = false) {
    return getTimeFormat(this.createTime, format);
  }
  getLink() {
    if (this.source === 'DAA') {
      return DAA_COURSE_NOTIFICATION_LINK_TEMPLATE + this.id;
    }
    if (this.source === 'OEP') {
      return OEP_COURSE_NOTIFICATION_LINK_TEMPLATE + this.id;
    }
    return '';
  }
  getEventId() {
    return this.eventId;
  }
  getEvent() {
    let title = this.getTitle();
    title = title.replace('Thông báo ', '');
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return {
      title,
      location: this.getRoom(),
      startDate: this.getStartTime('YYYY-MM-DD[T]HH:mm:ss.sss[Z]', true),
      endDate: this.getEndTime('YYYY-MM-DD[T]HH:mm:ss.sss[Z]', true),
      url: this.getLink(),
    };
  }
}

/*
    activeFilter: Bộ lọc hiện tại.
    listGeneralNotifications: Danh sách các thông báo chung.
    listCourseNotifications: Danh sách thông báo môn học.
    error: Chứa thông tin lỗi.
 */
const InitListNotification = Record({
  listGeneralNotifications: List(),
  listCourseNotifications: List(),
  loading: false,
  error: '',
});
export default class ListNotifications extends InitListNotification {
  getAllNotifications() {
    return this.listGeneralNotifications.merge(this.listCourseNotifications).toArray();
  }
  getGeneralNotifications() {
    return this.listGeneralNotifications.toArray();
  }
  getCourseNotifications(code = false) {
    if (code) {
      return this.listCourseNotifications.filter(item => item.getCode() === code).toArray();
    }
    return this.listCourseNotifications.toArray();
  }
  // Trả về số lượng thông báo nghỉ/bù chưa học.
  getNumberOfCoursesNotifications(code = false, data = false) {
    let count = 0;
    let countData;
    if (data) {
      countData = data;
    } else {
      countData = this.listCourseNotifications;
    }
    const currentTime = new Date();
    countData.forEach((item) => {
      if (item.getEndTime() > currentTime) {
        if (code) {
          if (item.getCode() === code) {
            count += 1;
          }
        } else {
          count += 1;
        }
      }
    });
    return count;
  }
  getNumberOfCourseNotificationsList() {
    const returnList = {};
    const currentTime = new Date();
    this.listCourseNotifications.forEach((item) => {
      if (item.getEndTime() >= currentTime) {
        if (typeof returnList[item.getCode()] !== 'undefined') {
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
