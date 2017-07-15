import { reducerFromClass } from '../../utils';
import ListNotification from './Object';
export class NotificationListReducer extends ListNotification {
    constructor(data) {
        super(data);
    }
    //Thêm một thông báo chung.
    ADD_GENERAL_NOTIFICATION({ notification }) {
        for(let item of this.listGeneralNotifications) {
            if (item.getLink() === notification.getLink()) {
                //Thông báo bị trùng.
                return this;
            }
        }
        let listGeneralNotifications = this.listGeneralNotifications.push(notification);
        listGeneralNotifications = this.set('listGeneralNotifications', listGeneralNotifications);
        return listGeneralNotifications;
    }
    //Thêm một thông báo môn học.
    ADD_COURSE_NOTIFICATION({ notification }) {
        for(let item of this.listCourseNotifications) {
            if (item.getLink() === notification.getLink()) {
                //Thông báo bị trùng.
                return this;
            }
        }
        let listCourseNotifications = this.listCourseNotifications.push(notification);
        listCourseNotifications = this.set('listCourseNotifications', listCourseNotifications);
        return listCourseNotifications;
    }
    //Set loading.
    SET_NOTIFICATION_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    //Set lỗi.
    SET_NOTIFICATION_ERROR({ error }) {
        return this.set('error', error);
    }
}
export default reducerFromClass(NotificationListReducer);
