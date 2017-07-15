const $ = require('cheerio-without-node-native');
import { Course } from './Object';

//Lấy thông tin môn học từ: https://daa.uit.edu.vn/ajax-block/tkb/ajax
export function parseCourseFromHtml(data) {
    data = $.load(data);
    let returnArray = [];
    data('tr').each(function () {
        let children = $(this).children();
        //Tên môn học.
        let name = "";
        if (typeof children[1].children[0] !== 'undefined') {
            name = children[1].children[0].data.trim();
        }
        //Mã môn học.
        let code = "";
        if (typeof children[2].children[0] !== 'undefined') {
            code = children[2].children[0].data.trim();
        }
        //Ngày học trong tuần.
        let dayOfWeek = 0;
        if (typeof children[3].children[0] !== 'undefined') {
            dayOfWeek = parseInt(children[3].children[0].data.trim());
        }
        //Giảng viên.
        let teacher = "";
        if (typeof children[6].children[0] !== 'undefined') {
            teacher = children[6].children[0].data.trim();
        }
        //Tiết bắt đầu và tiết kết thúc.
        let lessonStart = 0;
        let lessonEnd = 0;
        if (typeof children[4].children[0] !== 'undefined') {
            let lesson = children[4].children[0].data.trim();
            lessonEnd = parseInt(lesson % 10);
            if (lessonEnd === 0) lessonEnd = 10;
            lessonStart = lesson / 10;
            while (lessonStart > 10) {
                lessonStart = lessonStart / 10;
            }
            lessonStart = parseInt(lessonStart);
        }
        //Thời gian bắt đầu và thời gian kết thúc.
        let timeRangeStart = 0;
        let timeRangeEnd = 0;
        if (typeof children[7].children[0] !== 'undefined') {
            let timeRange = children[7].children[0].data.trim();
            timeRange = timeRange.split('-');
            let temp = timeRange[0].trim();
            temp = temp.split('/');
            timeRangeStart = new Date("20" + temp[2], temp[1] - 1, temp[0]);
            temp = timeRange[1].trim();
            temp = temp.split('/');
            timeRangeEnd = new Date("20" + temp[2], temp[1] - 1, temp[0]);
        }
        if ((name !== "") && (typeof code !== 'undefined') && (name !== "Môn học")) {
            let course = {
                code: code,
                name: name,
                dayOfWeek: dayOfWeek,
                teacher: teacher,
                lessonStart: lessonStart,
                lessonEnd: lessonEnd,
                startTime: timeRangeStart,
                endTime: timeRangeEnd,
            };
            course = new Course(course);
            returnArray.push(course);
        }
    });
    return returnArray;
}

//Lấy thông tin phòng của các lớp học từ: https://daa.uit.edu.vn/sinhvien/thoikhoabieu
export function parseCoursesRoomFromHtml(data) {
    let returnArray = [];
    data = $.load(data);
    data = data(".rowspan_data");
    if (typeof data === 'undefined') {
        return false;
    }
    data.each(function () {
        let children = $(this).children();
        if ((typeof children[0].children[0] !== 'undefined') && (typeof children[4] !== 'undefined')) {
            if (typeof children[4].next !== 'undefined') {
                let code = children[0].children[0].data;
                code = code.split('-');
                code = code[0].trim();
                if (typeof code !== 'undefined') {
                    let i = 0;
                    let room = false;
                    while (!room) {
                        room = children[i].next.data;
                        let Reg = new RegExp("P [ABCDEFGH]([0-9.]*)");
                        room = Reg.exec(room);
                        i++;
                        if (i > children.length) {
                            break;
                        }
                    }
                    room = room[0].split(' ');
                    room = room[1];
                    let course = {
                        code: code,
                        room: room
                    };
                    course = new Course(course);
                    returnArray.push(course);
                }
            }
        }
    });
    return returnArray;
}
//Hàm trả về giờ học theo tiết học.
export function getCourseTimeByLesson(lessonNumber, string = false) {
    let time = new Date();
    time.setHours(7);
    time.setMinutes(30 + 45 * (lessonNumber - 1));
    if (lessonNumber > 3) {
        time.setMinutes(time.getMinutes() + 15);
    }
    if (lessonNumber > 5) {
        time.setMinutes(time.getMinutes() + 90);
    }
    if (lessonNumber > 8) {
        time.setMinutes(time.getMinutes() + 15);
    }
    if (string === true) {
        return time.getHours() + ':' + time.getMinutes();
    }
    return time;
}