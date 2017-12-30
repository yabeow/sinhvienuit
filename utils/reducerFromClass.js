export default function (Klass) {
  return (state = new Klass(), action) => {
    const fn = state[action.type];
    if (fn) {
      return state[action.type](action);
    }
    return state;
  };
}
