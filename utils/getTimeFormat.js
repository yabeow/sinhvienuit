import Moment from 'moment';
require('../config/moment-time');

//Hàm trả về ngày giờ theo format.
export default function (time, format) {
    if (format) {
        let moment = Moment(time);
        switch (format) {
            case "calendar":
                return moment.calendar();
                break;
            case "fromNow":
                return moment.fromNow();
                break;
            default:
                return moment.format(format);
                break;
        }
    }
    return time;
}