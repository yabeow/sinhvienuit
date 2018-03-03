import { betweenTwoSubString, regexMatchAll, htmlEntityDecode } from '../../utils';
import { Deadline } from './Object';

export function parseListDeadlineIdFromHtml(html) {
  const regex = /<table class="event">([\s\S]*?)(?=<\/table>)/gm;
  const matchs = regexMatchAll(regex, html);
  return matchs
    .map((match) => {
      const [item] = match;
      const id = betweenTwoSubString(
        item,
        'https://courses.uit.edu.vn/mod/assign/view.php?id=',
        '"',
      ).trim();
      if (id && id !== '') {
        return id;
      }
      return undefined;
    })
    .filter(item => item !== undefined);
}
export function parseDeadlineFromHtml(html) {
  const id = betweenTwoSubString(
    html,
    '<a title="Assignment" href="https://courses.uit.edu.vn/mod/assign/view.php?id=',
    '"',
  ).trim();
  let code = betweenTwoSubString(html, 'https://courses.uit.edu.vn/course/view.php?id=', '</li>');
  code = betweenTwoSubString(code, '>', '</a>').trim();
  let title = betweenTwoSubString(html, '<h2>', '</h2>').trim();
  title = htmlEntityDecode(title);
  const content = betweenTwoSubString(html, '<div class="no-overflow">', '</div>').trim();
  let time = betweenTwoSubString(html, 'Due date', '</tr>');
  time = betweenTwoSubString(time, '">', '</td>');
  time = Date.parse(time);
  let status;
  if (html.includes('overdue')) {
    // Deadline is overdue, so sad :(
    status = -1;
  } else if (html.includes('submissionstatussubmitted')) {
    // Yeah yeah, not a deadline anymore!
    status = 1;
  } else {
    // It's a deadline, do asap!
    status = 0;
  }
  if (code && title && time) {
    return new Deadline({
      id,
      code,
      title,
      content,
      time,
      status,
    });
  }
  return false;
}
