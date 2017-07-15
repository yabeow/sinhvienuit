export default function (klass) {
    return function (state = new klass(), action) {
        let fn = state[action.type];
        if (fn) {
            return state[action.type](action);
        }
        else {
            return state;
        }

    }
}