import User from './Object';
import { betweenTwoSubString, regexMatchAll } from '../../utils';

// Lấy dữ liệu thông tin sinh viên từ: https://daa.uit.edu.vn/sinhvien/bang-dieu-khien
export function parseUserInformationFromHtml(html) {
  const regex = /<\/td><td>([\s\S]*?)(?=<\/td>)/gm;
  const matchs = regexMatchAll(regex, html);
  const matchArray = matchs.map(item => item[1]);
  return new User({
    name: matchArray[0],
    birthDay: matchArray[2],
    faculty: matchArray[3],
    trainType: matchArray[4],
  });
}
// Lấy link hình từ: https://daa.uit.edu.vn/khaibaolylich
export function parserUserPictureFromHtml(html) {
  const picture = betweenTwoSubString(html, '<div id="hinhthe"><img src="', '"');
  if (picture !== '') {
    return picture;
  }
  return false;
}
