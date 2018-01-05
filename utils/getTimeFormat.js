import Moment from 'moment';

require('../config/moment-time');

// Hàm trả về ngày giờ theo format.
export default function (time, format, utc = false) {
  if (format) {
    const moment = utc ? Moment.utc(time) : Moment(time);
    switch (format) {
      case 'calendar':
        return moment.calendar();
      case 'fromNow':
        return moment.fromNow();
      default:
        return moment.format(format);
    }
  }
  return time;
}
