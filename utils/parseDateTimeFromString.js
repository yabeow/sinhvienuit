import Moment from 'moment';

//Hàm parse từ chuỗi ngày giờ sang object ngày giờ.
export default function (dateString, format) {
    return Moment(dateString, format).toDate();
}