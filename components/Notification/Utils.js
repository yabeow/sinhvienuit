import { GeneralNotification, CourseNotification } from './Object';
import { getCourseTimeByLesson } from '../Course/Utils';
import {
  betweenTwoSubString,
  regexMatchAll,
  parseDateTimeFromString,
  htmlEntityDecode,
} from '../../utils';
import { DAA_HOMEPAGE, OEP_HOMEPAGE } from '../../config/config';

// Lấy dữ liệu thông báo chung từ: https://daa.uit.edu.vn/thong-bao-chung
export function parseDaaGeneralNotificationFromHtml(html) {
  try {
    const regex = /<article id([\s\S]*?)(?=<\/article>)/gm;
    const matchs = regexMatchAll(regex, html);
    return matchs
      .map((item) => {
        const [match] = item;
        let link = betweenTwoSubString(match, 'about="', '"');
        link = DAA_HOMEPAGE + link;
        const id = betweenTwoSubString(match, 'id="node-', '"');
        let title = betweenTwoSubString(match, 'property="dc:title" content="', '"');
        title = htmlEntityDecode(title);
        let createTime = betweenTwoSubString(match, 'property="dc:date dc:created" content="', '"');
        createTime = new Date(Date.parse(createTime));
        if (id && title) {
          const notification = {
            source: 'DAA',
            id,
            title,
            link,
            createTime,
          };
          return new GeneralNotification(notification);
        }
        return undefined;
      })
      .filter(item => item !== undefined);
  } catch (e) {
    alert(e.toString());
  }
  return [];
}

// Lấy dữ liệu thông báo chung từ: https://oep.uit.edu.vn/vi
export function parseOepGeneralNotificationFromHtml(html) {
  try {
    // General
    let data = betweenTwoSubString(
      html,
      'quicktabs-tabpage-thong_bao-0',
      'quicktabs-tabpage-thong_bao-1',
    );
    // Student activities
    const data2 = betweenTwoSubString(
      html,
      'quicktabs-tabpage-thong_bao-3',
      '</div></div></div></div>',
    );
    data += data2;
    const regex = /<li([\s\S]*?)(?=<\/li>)/gm;
    const matchs = regexMatchAll(regex, data);
    return matchs
      .map((item) => {
        const [match] = item;
        let link = betweenTwoSubString(match, 'href="', '"');
        link = OEP_HOMEPAGE + link;
        let title = betweenTwoSubString(match, '<a', 'a>');
        title = betweenTwoSubString(title, '">', '</');
        title = htmlEntityDecode(title);
        let createTime = betweenTwoSubString(match, '<span class="date">(', ')');
        createTime = createTime.split('/');
        const time = new Date();
        time.setDate(createTime[0]);
        time.setMonth(createTime[1] - 1);
        time.setYear(createTime[2]);
        createTime = time;
        if (title && createTime) {
          return new GeneralNotification({
            source: 'OEP',
            title,
            link,
            createTime,
          });
        }
        return undefined;
      })
      .filter(item => item !== undefined);
  } catch (e) {
    alert(e.toString());
    // ERROR HERE
  }
  return [];
}

// Lấy dữ liệu thông báo môn học từ: https://daa.uit.edu.vn/thong-bao-nghi-bu
export function parseDaaCourseNotificationFromHtml(html) {
  const regex = /<article([\s\S]*?)(?=<\/div><\/div><\/div>)/gm;
  const matchs = regexMatchAll(regex, html);
  return matchs
    .map((item) => {
      const data = item[0];
      // Nghỉ/bù?
      const type = data.includes('nghỉ') ? 2 : 1;
      // Mã môn học.
      let code = betweenTwoSubString(data, 'Lớp', '<br />');
      code = betweenTwoSubString(code, '<strong>', '</strong>').trim();
      if (typeof code === 'undefined') {
        return undefined;
      }
      // Id thông báo.
      const id = betweenTwoSubString(data, 'node/', '"');
      // Tiêu đề thông báo.
      let title = betweenTwoSubString(data, 'property="dc:title" content="', '"');
      title = htmlEntityDecode(title);
      // Ngày thông báo.
      let day = betweenTwoSubString(data, 'ngày', '</a>').trim();
      day = day.split('/');
      day = new Date(day[2], day[1] - 1, day[0]);
      // Phòng học.
      let room = betweenTwoSubString(data, 'Phòng', '<br />');
      room = betweenTwoSubString(room, '<strong>', '</strong>').trim();
      // Thời gian bắt đầu.
      let startTime = betweenTwoSubString(data, 'bắt đầu', '<br />');
      startTime = betweenTwoSubString(startTime, '<strong>', '</strong>').trim();
      let temp = getCourseTimeByLesson(startTime);
      startTime = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        temp.getHours(),
        temp.getMinutes(),
      );
      // Thời gian kết thúc.
      let endTime = betweenTwoSubString(data, 'kết thúc', '<br />');
      endTime = betweenTwoSubString(endTime, '<strong>', '</strong>').trim();
      temp = getCourseTimeByLesson(endTime);
      endTime = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        temp.getHours(),
        temp.getMinutes() + 45,
      );
      // Thời gian đăng thông báo.
      let createTime = betweenTwoSubString(data, 'dc:date dc:created" content="', '"').trim();
      createTime = new Date(Date.parse(createTime));
      if (id && code && room) {
        return new CourseNotification({
          type,
          source: 'DAA',
          id,
          code,
          title,
          startTime,
          endTime,
          room,
          createTime,
        });
      }
      return undefined;
    })
    .filter(item => item !== undefined);
}

// Lấy dữ liệu thông báo môn học từ: https://oep.uit.edu.vn/thong-bao-nghi-hoc-hoc-bu?page=1
export function parseOepCourseNotificationFromHtml(html) {
  const regex = /<article([\s\S]*?)(?=<\/article>)/gm;
  const matchs = regexMatchAll(regex, html);
  return matchs
    .map((match) => {
      const data = match[0];
      // Loại thông báo.
      const type = data.includes('nghỉ') ? 2 : 1;
      // Mã lớp.
      const code = betweenTwoSubString(data, 'Lớp :', 'Phòng').trim();
      // Id
      const id = betweenTwoSubString(data, 'node/', '"');
      // Tiêu đề.
      let title = betweenTwoSubString(data, 'rel="tag" title="', '"');
      title = htmlEntityDecode(title);
      // Phòng học.
      const room = betweenTwoSubString(data, 'Phòng :', 'Thời gian').trim();
      // Ngày
      let day = betweenTwoSubString(data, 'ngày', '</a>').trim();
      day = day.split('/');
      day = new Date(day[2], day[1] - 1, day[0]);
      // Thời gian bắt đầu.
      let startTime = betweenTwoSubString(data, 'bắt đầu :', '-').trim();
      let temp = getCourseTimeByLesson(startTime);
      startTime = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        temp.getHours(),
        temp.getMinutes(),
      );
      // Thời gian kết thúc.
      let endTime = betweenTwoSubString(data, 'kết thúc :', 'Thứ').trim();
      temp = getCourseTimeByLesson(endTime);
      endTime = new Date(
        day.getFullYear(),
        day.getMonth(),
        day.getDate(),
        temp.getHours(),
        temp.getMinutes() + 45,
      );
      // Thời gian đăng thông báo.
      const createTimeArr = betweenTwoSubString(data, "<div class='submitted'>", '</div>').trim();
      let [createTime] = createTimeArr.split(',');
      createTime = parseDateTimeFromString(createTime, 'DD/MM/YYYY - HH:mm');
      if (id && type && room) {
        return new CourseNotification({
          type,
          source: 'OEP',
          id,
          code,
          title,
          startTime,
          endTime,
          room,
          createTime,
        });
      }
      return undefined;
    })
    .filter(item => item !== undefined);
}
