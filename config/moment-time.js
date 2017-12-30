(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' && typeof require === 'function'
    ? factory(require('../node_modules/moment/moment'))
    : typeof define === 'function' && define.amd
      ? define(['../node_modules/moment/moment'], factory)
      : factory(global.moment);
}(this, moment =>
  moment.defineLocale('vi', {
    months: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12',
    ],
    monthsShort: [
      'Th01',
      'Th02',
      'Th03',
      'Th04',
      'Th05',
      'Th06',
      'Th07',
      'Th08',
      'Th09',
      'Th10',
      'Th11',
      'Th12',
    ],
    monthsParseExact: true,
    weekdays: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    weekdaysMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    weekdaysParseExact: true,
    meridiemParse: /SA|CH/i,
    isPM(input) {
      return /^ch$/i.test(input);
    },
    meridiem(hours, minutes, isLower) {
      if (hours < 12) {
        return isLower ? 'sa' : 'SA';
      }
      return isLower ? 'ch' : 'CH';
    },
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM [năm] YYYY',
      LLL: 'D MMMM [năm] YYYY HH:mm',
      LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
      l: 'DD/M/YYYY',
      ll: 'D MMM YYYY',
      lll: 'D MMM YYYY HH:mm',
      llll: 'ddd, D MMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[Hôm nay lúc] LT',
      nextDay: '[Ngày mai lúc] LT',
      nextWeek: 'dddd [Tuần tới lúc] LT',
      lastDay: '[Hôm qua lúc] LT',
      lastWeek: 'dddd [Tuần trước lúc] LT',
      sameElse: 'DD/MM [lúc] LT',
    },
    relativeTime: {
      future: '%s tới',
      past: '%s trước',
      s: 'vài giây',
      m: 'một phút',
      mm: '%d phút',
      h: 'một giờ',
      hh: '%d giờ',
      d: 'một ngày',
      dd: '%d ngày',
      M: 'một tháng',
      MM: '%d tháng',
      y: 'một năm',
      yy: '%d năm',
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal(number) {
      return number;
    },
    week: {
      dow: 1, // Monday is the first day of the week.
      doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
  })));
