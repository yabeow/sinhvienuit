const fetchObject = require('fetch');
import { REQUEST_TIMEOUT, DAA_HOMEPAGE, OEP_HOMEPAGE, MOODLE_HOMEPAGE, DRL_HOMEPAGE } from '../config/config';
import errorMessages from '../config/errors';

export default function (source = false, endPoint = '', postData = false, credentials = true) {
    switch(source) {
        case 'DAA': endPoint = DAA_HOMEPAGE + endPoint; break;
        case 'OEP': endPoint = OEP_HOMEPAGE + endPoint; break;
        case 'MOODLE': endPoint = MOODLE_HOMEPAGE + endPoint; break;
        case 'DRL': endPoint = DRL_HOMEPAGE + endPoint; break;
        default: break;
    }
    let fetchPromise;
    if (postData) {
        fetchPromise = fetchObject.fetch(endPoint,
            {
                method: 'POST',
                credentials: (credentials === true) ? 'same-origin' : 'omit',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: postData
            }
        )
    }
    else {
        fetchPromise = fetchObject.fetch(endPoint, {credentials: (credentials === true) ? 'same-origin' : 'omit'});
    }
    return Promise.race([
        fetchPromise,
        new Promise(function (resolve, reject) {
            setTimeout(() => reject(new Error(errorMessages.networkError)), REQUEST_TIMEOUT)
        })
    ]);
}