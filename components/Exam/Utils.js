import { Exam } from './Object';
import { parseDateTimeFromString } from '../../utils';

//Lấy thông tin các môn học từ: https://daa.uit.edu.vn/ajax-block/lichthi/ajax
export function parseExamFromHtml(data) {
    try {
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
            let code = matchArray[2].trim();
            let time = parseInt(matchArray[3].trim());
            time = getExamTime(time);
            let date = parseDateTimeFromString(matchArray[5].trim(), 'DD-MM-YYYY');
            date.setHours(time.getHours());
            date.setMinutes(time.getMinutes());
            date.setSeconds(0);
            date.setMilliseconds(0);
            let room = matchArray[6].trim();
            let exam = new Exam({
                code: code,
                time: date,
                room: room
            });
            returnArray.push(exam);
        }
        return returnArray;
    }
    catch(e) {
        alert(e.toString());
    }
}
export function getExamTime(number) {
    let time = new Date();
    switch (number) {
        case 1: time.setHours(7); time.setMinutes(30);
            break;
        case 2: time.setHours(9); time.setMinutes(30);
            break;
        case 3: time.setHours(13); time.setMinutes(30);
            break;
        case 4: time.setHours(15); time.setMinutes(30);
            break;
    }
    return time;
}