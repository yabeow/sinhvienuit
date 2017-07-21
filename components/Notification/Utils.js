import { GeneralNotification, CourseNotification } from './Object';
import { getCourseTimeByLesson } from '../Course/Utils';
import { betweenTwoSubString, parseDateTimeFromString } from '../../utils';
import { DAA_HOMEPAGE, OEP_HOMEPAGE } from '../../config/config';

//Lấy dữ liệu thông báo chung từ: https://daa.uit.edu.vn/thong-bao-chung
export function parseDaaGeneralNotificationFromHtml(html) {
    try {
        let regex = /<article id([\s\S]*?)(?=<\/article>)/gm;
        let match;
        let returnArray = [];
        while ((match = regex.exec(html)) !== null) {
            match = match[0];
            let link = betweenTwoSubString(match, 'about="', '"');
            link = DAA_HOMEPAGE + link;
            let id = betweenTwoSubString(match, 'id="node-', '"');
            let title = betweenTwoSubString(match, 'property="dc:title" content="', '"');
            let createTime = betweenTwoSubString(match, 'property="dc:date dc:created" content="', '"');
            createTime = new Date(Date.parse(createTime));
            let notification = {
                source: "DAA",
                id: id,
                title: title,
                link: link,
                createTime: createTime
            };
            notification = new GeneralNotification(notification);
            returnArray.push(notification);
        }
        return returnArray;
    }
    catch(e) {
        alert(e.toString());
    }
}

//Lấy dữ liệu thông báo chung từ: https://oep.uit.edu.vn/home
export function parseOepGeneralNotificationFromHtml(html) {
    try {
        //General
        let data = betweenTwoSubString(html, 'quicktabs-tabpage-thong_bao-0', 'quicktabs-tabpage-thong_bao-1');
        //Student activities
        let data2 = betweenTwoSubString(html, 'quicktabs-tabpage-thong_bao-3', '</div></div></div></div>');
        data = data + data2;
        let regex = /<li([\s\S]*?)(?=<\/li>)/gm;
        let match;
        let returnArray = [];
        while ((match = regex.exec(data)) !== null) {
            match = match[0];
            let link = betweenTwoSubString(match, 'href="', '"');
            link = OEP_HOMEPAGE + link;
            let title = betweenTwoSubString(match, '<a', 'a>');
            title = betweenTwoSubString(title, '">', '</');
            let createTime = betweenTwoSubString(match, '<span class="date">(', ')');
            createTime = createTime.split('/');
            let time  = new Date();
            time.setDate(createTime[0]);
            time.setMonth(createTime[1] - 1);
            time.setYear(createTime[2]);
            createTime = time;
            let notification = new GeneralNotification({
                source: "OEP",
                title: title,
                link: link,
                createTime: createTime,
            });
            returnArray.push(notification);
        }
        return returnArray;
    }
    catch(e) {
        alert(e.toString());
    }
}

//Lấy dữ liệu thông báo môn học từ: https://daa.uit.edu.vn/thong-bao-nghi-bu
export function parseDaaCourseNotificationFromHtml(html) {
    let regex = /<article([\s\S]*?)(?=<\/div><\/div><\/div>)/gm;
    let match;
    let returnArray = [];
    while ((match = regex.exec(html)) !== null) {
        let data = match[0];
        //Nghỉ/bù?
        let type = (data.includes("nghỉ")) ? 2 : 1;
        //Mã môn học.
        let code = betweenTwoSubString(data, "Lớp", "<br />");
        code = betweenTwoSubString(code, "<strong>", "</strong>").trim();
        if (typeof code === 'undefined') {
            continue;
        }
        //Id thông báo.
        let id = betweenTwoSubString(data, "node/", '"');
        //Tiêu đề thông báo.
        let title = betweenTwoSubString(data, 'property="dc:title" content="', '"');
        //Ngày thông báo.
        let day = betweenTwoSubString(data, "ngày", "</a>").trim();
        day = day.split('/');
        day = new Date(day[2], day[1] - 1, day[0]);
        //Phòng học.
        let room = betweenTwoSubString(data, "Phòng", "<br />");
        room = betweenTwoSubString(room, "<strong>", "</strong>").trim();
        //Thời gian bắt đầu.
        let startTime = betweenTwoSubString(data, "bắt đầu", "<br />");
        startTime = betweenTwoSubString(startTime, "<strong>", "</strong>").trim();
        let temp = getCourseTimeByLesson(startTime);
        startTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), temp.getHours(), temp.getMinutes());
        //Thời gian kết thúc.
        let endTime = betweenTwoSubString(data, "kết thúc", "<br />");
        endTime = betweenTwoSubString(endTime, "<strong>", "</strong>").trim();
        temp = getCourseTimeByLesson(endTime);
        endTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), temp.getHours(), temp.getMinutes() + 45);
        //Thời gian đăng thông báo.
        let createTime = betweenTwoSubString(data, 'dc:date dc:created" content="', '"').trim();
        createTime = new Date(Date.parse(createTime));
        let notification = new CourseNotification({
            type: type,
            source: "DAA",
            id: id,
            code: "EN004.H31",
            title: title,
            startTime: startTime,
            endTime: endTime,
            room: room,
            createTime: createTime
        });
        returnArray.push(notification);
        break;
    }
    return returnArray;
}

//Lấy dữ liệu thông báo môn học từ: https://oep.uit.edu.vn/thong-bao-nghi-hoc-hoc-bu?page=1
export function parseOepCourseNotificationFromHtml(html) {
    let regex = /<article([\s\S]*?)(?=<\/article>)/gm;
    let match;
    let returnArray = [];
    while ((match = regex.exec(html)) !== null) {
        let data = match[0];
        //Loại thông báo.
        let type = (data.includes("nghỉ")) ? 2 : 1;
        //Mã lớp.
        let code = betweenTwoSubString(data, "Lớp :", "Phòng").trim();
        //Id
        let id = betweenTwoSubString(data, "node/", '"');
        //Tiêu đề.
        let title = betweenTwoSubString(data, 'rel="tag" title="', '"');
        //Phòng học.
        let room = betweenTwoSubString(data, "Phòng :", "Thời gian").trim();
        //Ngày
        let day = betweenTwoSubString(data, "ngày", "</a>").trim();
        day = day.split('/');
        day = new Date(day[2], day[1] - 1, day[0]);
        //Thời gian bắt đầu.
        let startTime = betweenTwoSubString(data, "bắt đầu :", "-").trim();
        let temp = getCourseTimeByLesson(startTime);
        startTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), temp.getHours(), temp.getMinutes());
        //Thời gian kết thúc.
        let endTime = betweenTwoSubString(data, "kết thúc :", "Thứ").trim();
        temp = getCourseTimeByLesson(endTime);
        endTime = new Date(day.getFullYear(), day.getMonth(), day.getDate(), temp.getHours(), temp.getMinutes() + 45);
        //Thời gian đăng thông báo.
        let createTime = betweenTwoSubString(data, "<div class='submitted'>", '</div>').trim();
        createTime = createTime.split(',')[1];
        createTime = parseDateTimeFromString(createTime, 'DD/MM/YYYY - HH:mm');
        if (id && type && createTime) {
            let notification = new CourseNotification({
                type: type,
                source: "OEP",
                id: id,
                code: code,
                title: title,
                startTime: startTime,
                endTime: endTime,
                room: room,
                createTime: createTime
            });
            returnArray.push(notification);
        }
    }
    return returnArray;
}