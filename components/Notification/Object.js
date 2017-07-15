const { Record, List } = require('immutable');
import { getTimeFormat } from '../../utils';

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
    source: false,
    id: false,
    title: false,
    link: false,
    content: false,
    createTime: false,
    isNotified: false
});
export class GeneralNotification extends InitGeneralNotification {
    constructor(data) {
        super(data);
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
    startTime: Thời gian bắt đầu.
    endTime: Thời gian kết thúc.
    room: Phòng học.
    createTime: Giờ đăng.
 */
const InitCourseNotification = Record({
    type: false,
    source: false,
    id: false,
    code: false,
    startTime: false,
    endTime: false,
    room: false,
    createTime: false
});
export class CourseNotification extends InitCourseNotification {
    constructor(data) {
        super(data);
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
    getStartTime(format = false) {
        return getTimeFormat(this.startTime, format);
    }
    getEndTime(format = false) {
        return getTimeFormat(this.endTime, format);
    }
    getRoom() {
        return this.room;
    }
    getCreateTime(format = false) {
        return getTimeFormat(this.createTime, format);
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
    error: false
});
export default class ListNotifications extends InitListNotification {
    constructor(data) {
        super(data);
    }
    getAllNotifications() {
        return this.listGeneralNotifications.merge(this.listCourseNotifications);
    }
    getGeneralNotifications() {
        return this.listGeneralNotifications;
    }
    getCourseNotifications() {
        return this.listCourseNotifications;
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}