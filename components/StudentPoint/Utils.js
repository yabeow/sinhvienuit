import { StudentPoint } from './Object';
import { betweenTwoSubString } from '../../utils'

//Lấy dữ liệu tổng điểm từ: https://drl.uit.edu.vn/sinhvien/renluyensinhvien/diemrenluyen
export function parseFinalStudentPointFromHtml(html) {
    try {
        let finalPoint = betweenTwoSubString(html, 'Tổng điểm rèn luyện', '</b>');
        finalPoint = betweenTwoSubString(finalPoint, ':', '</p>').trim();
        if (finalPoint !== "") {
            return parseInt(finalPoint);
        }
        return false;
    }
    catch(e) {

    }
}

//Lấy dữ liệu các hoạt động được công điểm từ: https://drl.uit.edu.vn/sinhvien/renluyensinhvien/diemrenluyen
export function parseStudentPointFromHtml(html) {
    try {
        let regex = /<tbody>([\s\S]*?)(?=<\/tbody>)/gm;
        let match;
        let returnArray = [];
        while ((match = regex.exec(html)) !== null) {
            let regex2 = /<tr class=([\s\S]*?)(?=<\/tr>)/gm;
            let match2;
            while ((match2 = regex2.exec(match[1])) !== null) {
                let regex3 = /<td([\s\S]*?)(?=<\/td>)/gm;
                let match3;
                let pointData = [];
                while ((match3 = regex3.exec(match2[1])) !== null) {
                    pointData.push(match3[1]);
                }
                if(pointData.length === 8) {
                    let id = betweenTwoSubString(pointData[0], 'thongtinhoatdong/', '"');
                    let title = betweenTwoSubString(pointData[0], '<a', '</a>');
                    title = betweenTwoSubString(title + '</a>', '">', '</a>');
                    let point = betweenTwoSubString(pointData[4] + '</td>', '">', '</td>');
                    let studentPoint = new StudentPoint({
                        id: id,
                        title: title,
                        point: point
                    });
                    if (id.length && title.length && point.length) {
                        returnArray.push(studentPoint);
                    }
                }
            }
        }
        return returnArray;
    }
    catch(e) {
        alert(e.toString())
    }
}