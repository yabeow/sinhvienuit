import { StudentPoint } from './Object';
import { betweenTwoSubString, regexMatchAll, htmlEntityDecode } from '../../utils';

// Lấy dữ liệu tổng điểm từ: https://drl.uit.edu.vn/sinhvien/renluyensinhvien/diemrenluyen
export function parseFinalStudentPointFromHtml(html) {
  try {
    let finalPoint = betweenTwoSubString(html, 'Tổng điểm rèn luyện', '</b>');
    finalPoint = betweenTwoSubString(finalPoint, ':', '</p>').trim();
    if (finalPoint !== '') {
      return parseInt(finalPoint, 10);
    }
    return false;
  } catch (e) {
    // ERROR HERE
  }
  return undefined;
}

// Lấy dữ liệu các hoạt động được công điểm từ: https://drl.uit.edu.vn/sinhvien/renluyensinhvien/diemrenluyen
export function parseStudentPointFromHtml(html) {
  try {
    const regex = /<tbody>([\s\S]*?)(?=<\/tbody>)/gm;
    const regex2 = /<tr class=([\s\S]*?)(?=<\/tr>)/gm;
    const regex3 = /<td([\s\S]*?)(?=<\/td>)/gm;
    const matchs = regexMatchAll(regex, html);
    let returnArray = [];
    matchs.forEach((match) => {
      const matchs2 = regexMatchAll(regex2, match[1]);
      returnArray = [
        ...returnArray,
        ...matchs2
          .map((item2) => {
            const matchs3 = regexMatchAll(regex3, item2[1]);
            const pointData = matchs3.map(item3 => item3[1]);
            const point = betweenTwoSubString(`${pointData[4]}</td>`, '">', '</td>');
            if (point) {
              const id = betweenTwoSubString(pointData[0], 'thongtinhoatdong/', '"');
              let title = betweenTwoSubString(pointData[0], '<a', '</a>');
              title = betweenTwoSubString(`${title}</a>`, '">', '</a>');
              title = htmlEntityDecode(title);
              if (id && title) {
                return new StudentPoint({
                  id,
                  title,
                  point,
                });
              }
            }
            return undefined;
          })
          .filter(item => item !== undefined),
      ];
    });
    return returnArray;
  } catch (e) {
    alert(e.toString());
    // ERROR HERE
  }
  return [];
}
