import { SET_FIRST_TIME } from './Action';

export default function (state = true, action) {
    switch (action.type) {
        case SET_FIRST_TIME:
            return !state;
        default:
            return state
    }
}
