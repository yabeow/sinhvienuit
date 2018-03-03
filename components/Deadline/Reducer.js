import { reducerFromClass } from '../../utils';
import DeadlineList from './Object';

export class DeadlineListReducer extends DeadlineList {
  // Thêm một deadline cho môn học.
  ADD_DEADLINE({ deadline }) {
    let dup = false;
    this.listDeadlines.map((item) => {
      if (item.getId() === deadline.getId()) {
        dup = true;
      }
      return false;
    });
    if (dup) {
      return new DeadlineList(this.listDeadlines.map((item) => {
        if (item.getId() === deadline.getId()) {
          return item.set('status', deadline.getStatus());
        }
        return item;
      }));
    }
    const listDeadlines = this.listDeadlines.push(deadline);
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
