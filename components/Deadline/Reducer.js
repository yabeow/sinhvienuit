import { List } from 'immutable';
import { reducerFromClass } from '../../utils';
import DeadlineList from './Object';

export class DeadlineListReducer extends DeadlineList {
  // Thêm một deadline cho môn học.
  ADD_DEADLINE({ deadline }) {
    let dup = false;
    let listDeadlines = new List(this.listDeadlines.map((item) => {
      if (item.getId() === deadline.getId()) {
        dup = true;
        return deadline;
      }
      return item;
    }));
    if (!dup) {
      listDeadlines = this.listDeadlines.push(deadline);
    }
    return this.set('listDeadlines', listDeadlines);
  }
  // Set status cho deadline.
  SET_DEADLINE_STATUS({ id, status }) {
    return new DeadlineList(this.listDeadlines.map((item) => {
      if (item.getId() === id) {
        return item.set('status', status);
      }
      return item;
    }));
  }
  // Set loading.
  SET_DEADLINE_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Set lỗi.
  SET_DEADLINE_ERROR({ error }) {
    return this.set('error', error).set('loading', false);
  }
}
export default reducerFromClass(DeadlineListReducer);
