import { Course } from './Object';
import { betweenTwoSubString } from '../../utils';

//Lấy thông tin môn học từ: https://daa.uit.edu.vn/ajax-block/tkb/ajax
export function parseCourseFromHtml(data) {
    let returnArray = [];
    let regexRow = /<tr class=([\s\S]*?)(?=<\/tr>)/gm;
    let row;
    while ((row = regexRow.exec(data)) !== null) {
        let regexColumn = /<td>([\s\S]*?)(?=<\/td>)/gm;
        let matchArray = [];
        let column;
        while ((column = regexColumn.exec(row[1])) !== null) {
            matchArray.push(column[1]);
        }
        //Tên môn học.
        let name = matchArray[1].trim();
        //Mã môn học.
        let code = matchArray[2].trim();
        //Ngày học trong tuần.
        let dayOfWeek = matchArray[3].trim();
        //Tiết bắt đầu và tiết kết thúc.
        let lesson = matchArray[4];
        let lessonStart = 0;
        let lessonEnd = 0;
        lessonEnd = parseInt(lesson % 10);
        if (lessonEnd === 0) lessonEnd = 10;
        lessonStart = lesson / 10;
        while (lessonStart > 10) {
            lessonStart = lessonStart / 10;
        }
        lessonStart = parseInt(lessonStart);
        //Giảng viên.
        let teacher = matchArray[6].trim();
        //Phòng học.
        let temp = matchArray[7].trim();
        let room = betweenTwoSubString(temp, 'P', '<br />');
        //Ngày bắt đầu.
        let startTime = betweenTwoSubString(temp, 'BĐ:', '<br />').trim();
        startTime = startTime.split('/');
        startTime = new Date("20" + startTime[2], startTime[1] - 1, startTime[0]);
        //Ngày kết thúc.
        let endTime = betweenTwoSubString(temp + '---', 'KT:', '---').trim();
        endTime = endTime.split('/');
        endTime = new Date("20" + endTime[2], endTime[1] - 1, endTime[0]);
        if ((name !== "") && (typeof code !== 'undefined') && (name !== "Môn học")) {
            let course = {
                code: code,
                name: name,
                dayOfWeek: dayOfWeek,
                room: room,
                teacher: teacher,
                lessonStart: lessonStart,
                lessonEnd: lessonEnd,
                startTime: startTime,
                endTime: endTime,
            };
            course = new Course(course);
            returnArray.push(course);
        }
    }
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