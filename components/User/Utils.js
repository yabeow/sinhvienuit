import User from './Object';
import { betweenTwoSubString } from '../../utils';

//Lấy dữ liệu thông tin sinh viên từ: https://daa.uit.edu.vn/sinhvien/bang-dieu-khien
export function parseUserInformationFromHtml(html) {
    let regex = /<\/td><td>([\s\S]*?)(?=<\/td>)/gm;
    let match;
    let match_array = [];
    while ((match = regex.exec(html)) !== null) {
        match_array.push(match[1]);
    }
    return new User({
        name: match_array[0],
        birthDay: match_array[2],
        faculty: match_array[3],
        trainType: match_array[4]
    });
}
//Lấy link hình từ: https://daa.uit.edu.vn/khaibaolylich
export function parserUserPictureFromHtml(html) {
    let picture = betweenTwoSubString(html, '<div id="hinhthe"><img src="', '"');
    if (picture !== '') {
        return picture;
    }
    return false;
}