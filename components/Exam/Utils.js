import { Exam } from './Object';
import { parseDateTimeFromString, regexMatchAll } from '../../utils';

// Lấy thông tin các môn học từ: https://daa.uit.edu.vn/ajax-block/lichthi/ajax
export function parseExamFromHtml(data) {
  try {
    const regexRow = /<tr class=([\s\S]*?)(?=<\/tr>)/gm;
    const regexColumn = /<td>([\s\S]*?)(?=<\/td>)/gm;
    const rows = regexMatchAll(regexRow, data);
    return rows
      .map((row) => {
        const columns = regexMatchAll(regexColumn, row[1]);
        const matchArray = columns.map(column => column[1]);
        const code = matchArray[2].trim();
        let time = parseInt(matchArray[3].trim(), 10);
        time = getExamTime(time);
        const date = parseDateTimeFromString(matchArray[5].trim(), 'DD-MM-YYYY');
        date.setHours(time.getHours());
        date.setMinutes(time.getMinutes());
        date.setSeconds(0);
        date.setMilliseconds(0);
        const room = matchArray[6].trim();
        const exam = new Exam({
          code,
          time: date,
          room,
        });
        return exam;
      })
      .filter(item => item !== undefined);
  } catch (e) {
    // CATCH ERROR HERE
  }
  return true;
}
export function getExamTime(number) {
  const time = new Date();
  switch (number) {
    case 1:
      time.setHours(7);
      time.setMinutes(30);
      break;
    case 2:
      time.setHours(9);
      time.setMinutes(30);
      break;
    case 3:
      time.setHours(13);
      time.setMinutes(30);
      break;
    case 4:
      time.setHours(15);
      time.setMinutes(30);
      break;
    default:
      break;
  }
  return time;
}
