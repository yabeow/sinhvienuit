import { Course } from './Object';
import { betweenTwoSubString, regexMatchAll } from '../../utils';

// Lấy thông tin môn học từ: https://daa.uit.edu.vn/ajax-block/tkb/ajax
export function parseCourseFromHtml(data) {
  const regexRow = /<tr class=([\s\S]*?)(?=<\/tr>)/gm;
  const regexColumn = /<td>([\s\S]*?)(?=<\/td>)/gm;
  const rows = regexMatchAll(regexRow, data);
  return rows
    .map((row) => {
      const columns = regexMatchAll(regexColumn, row[1]);
      const matchArray = columns.map(column => column[1]);
      // Tên môn học.
      const name = matchArray[1].trim();
      // Mã môn học.
      const code = matchArray[2].trim();
      // Ngày học trong tuần.
      const dayOfWeek = matchArray[3].trim();
      // Tiết bắt đầu và tiết kết thúc.
      const lesson = matchArray[4];
      let lessonStart = 0;
      let lessonEnd = 0;
      lessonEnd = parseInt(lesson % 10, 10);
      if (lessonEnd === 0) lessonEnd = 10;
      lessonStart = lesson / 10;
      while (lessonStart > 10) {
        lessonStart /= 10;
      }
      lessonStart = parseInt(lessonStart, 10);
      // Giảng viên.
      const teacher = matchArray[6].trim();
      // Phòng học.
      const temp = matchArray[7].trim();
      const room = betweenTwoSubString(temp, 'P', '<br />').trim();
      // Ngày bắt đầu.
      let startTime = betweenTwoSubString(temp, 'BĐ:', '<br />').trim();
      startTime = startTime.split('/');
      startTime = new Date(`20${startTime[2]}`, startTime[1] - 1, startTime[0]);
      if (!startTime) return undefined;
      // Ngày kết thúc.
      let endTime = betweenTwoSubString(`${temp}---`, 'KT:', '---').trim();
      if (!endTime) return undefined;
      endTime = endTime.split('/');
      endTime = new Date(`20${endTime[2]}`, endTime[1] - 1, endTime[0]);
      if (
        name !== '' &&
        typeof code !== 'undefined' &&
        name !== 'Môn học' &&
        startTime &&
        endTime
      ) {
        let course = {
          code,
          name,
          dayOfWeek,
          room,
          teacher,
          lessonStart,
          lessonEnd,
          startTime,
          endTime,
        };
        course = new Course(course);
        return course;
      }
      return undefined;
    })
    .filter(item => item !== undefined);
}

// Hàm trả về giờ học theo tiết học.
export function getCourseTimeByLesson(lessonNumber, string = false) {
  const time = new Date();
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
    return `${time.getHours()}:${time.getMinutes()}`;
  }
  return time;
}
