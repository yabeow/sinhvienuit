import {
  REQUEST_TIMEOUT,
  DAA_HOMEPAGE,
  OEP_HOMEPAGE,
  MOODLE_HOMEPAGE,
  DRL_HOMEPAGE,
} from '../config/config';
import errorMessages from '../config/errors';

const fetchObject = require('fetch');

export default function (source = false, endPoint = '', postData = false, credentials = true) {
  let requestUrl = '';
  switch (source) {
    case 'DAA':
      requestUrl = DAA_HOMEPAGE + endPoint;
      break;
    case 'OEP':
      requestUrl = OEP_HOMEPAGE + endPoint;
      break;
    case 'MOODLE':
      requestUrl = MOODLE_HOMEPAGE + endPoint;
      break;
    case 'DRL':
      requestUrl = DRL_HOMEPAGE + endPoint;
      break;
    default:
      break;
  }
  let fetchPromise;
  if (postData) {
    fetchPromise = fetchObject.fetch(requestUrl, {
      method: 'POST',
      credentials: credentials === true ? 'same-origin' : 'omit',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: postData,
    });
  } else {
    fetchPromise = fetchObject.fetch(requestUrl, {
      credentials: credentials === true ? 'same-origin' : 'omit',
    });
  }
  return Promise.race([
    fetchPromise,
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(errorMessages.networkError)), REQUEST_TIMEOUT);
    }),
  ]);
}
