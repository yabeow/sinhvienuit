import { GeneralNotification } from './Object';
import { betweenTwoSubString } from '../../utils';
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