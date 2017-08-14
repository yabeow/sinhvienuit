const { Record, List } = require('immutable');
import { getTimeFormat } from '../../utils';
import {
    DAA_COURSE_NOTIFICATION_LINK_TEMPLATE,
    OEP_COURSE_NOTIFICATION_LINK_TEMPLATE
} from '../../config/config';
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
    title: Tiêu đề thông báo.
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
    title: false,
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
    getTitle() {
        return this.title;
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
    getLink() {
        if (this.source === "DAA") {
            return DAA_COURSE_NOTIFICATION_LINK_TEMPLATE + this.id;
        }
        if (this.source === "OEP") {
            return OEP_COURSE_NOTIFICATION_LINK_TEMPLATE + this.id;
        }
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
        return this.listGeneralNotifications.merge(this.listCourseNotifications).toArray();
    }
    getGeneralNotifications() {
        return this.listGeneralNotifications.toArray();
    }
    getCourseNotifications(code = false) {
        if (code) {
            return this.listCourseNotifications.filter(function (item) {
                return item.getCode() === code;
            }).toArray();
        }
        return this.listCourseNotifications.toArray();
    }
    //Trả về số lượng thông báo nghỉ/bù chưa học.
    getNumberOfCoursesNotifications(code = false, data = false) {
        let count     = 0;
        let countData;
        if (data) {
            countData = data;
        }
        else {
            countData = this.listCourseNotifications;
        }
        let currentTime = new Date();
        countData.forEach(function(item) {
            if (item.getEndTime() > currentTime) {
                if (code) {
                    if (item.getCode() === code) {
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
    getNumberOfCourseNotificationsList() {
        let returnList = {};
        let currentTime = new Date();
        this.listCourseNotifications.map(function(item) {
           if (item.getEndTime() >= currentTime) {
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