import { reducerFromClass } from '../../utils';
import ListNotification from './Object';

export class NotificationListReducer extends ListNotification {
  // Thêm một thông báo chung.
  ADD_GENERAL_NOTIFICATION({ notification }) {
    const index = this.listGeneralNotifications.findIndex(item => item.getLink() === notification.getLink());
    if (index !== -1) return this;
    let listGeneralNotifications = this.listGeneralNotifications.push(notification);
    listGeneralNotifications = this.set('listGeneralNotifications', listGeneralNotifications);
    return listGeneralNotifications;
  }
  // Thêm một thông báo môn học.
  ADD_COURSE_NOTIFICATION({ notification }) {
    const index = this.listCourseNotifications.findIndex(item => item.getLink() === notification.getLink());
    if (index !== -1) return this;
    let listCourseNotifications = this.listCourseNotifications.push(notification);
    listCourseNotifications = this.set('listCourseNotifications', listCourseNotifications);
    return listCourseNotifications;
  }
  // Set loading.
  SET_NOTIFICATION_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Set lỗi.
  SET_NOTIFICATION_ERROR({ error }) {
    return this.set('error', error).set('loading', false);
  }
}
export default reducerFromClass(NotificationListReducer);
