const fetchObject = require('fetch');
import { DAA_HOMEPAGE, OEP_HOMEPAGE, MOODLE_HOMEPAGE } from '../config/config';

export default function (source = false, endPoint = '', postData = false, credentials = true) {
    switch(source) {
        case 'DAA': endPoint = DAA_HOMEPAGE + endPoint; break;
        case 'OEP': endPoint = OEP_HOMEPAGE + endPoint; break;
        case 'MOODLE': endPoint = MOODLE_HOMEPAGE + endPoint; break;
        default: break;
    }
    if (postData) {
        return fetchObject.fetch(endPoint,
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
    return fetchObject.fetch(endPoint, { credentials: (credentials === true) ? 'same-origin' : 'omit' });
}