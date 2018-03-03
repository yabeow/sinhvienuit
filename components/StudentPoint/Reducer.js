import { List } from 'immutable';
import { reducerFromClass } from '../../utils';
import PointList from './Object';

export class PointListReducer extends PointList {
  // Thêm một hoạt động.
  ADD_POINT({ point }) {
    let dup = false;
    let listPoints = new List(this.listPoints.map((item) => {
      if (item.getId() === point.getId()) {
        dup = true;
        return point;
      }
      return item;
    }));
    if (!dup) {
      listPoints = this.listPoints.push(point);
    }
    return this.set('listPoints', listPoints);
  }
  SET_FINAL_POINT({ point }) {
    if (point >= 0) {
      return this.set('finalPoint', point);
    }
    return this;
  }
  // Set loading.
  SET_POINT_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  // Set lỗi.
  SET_POINT_ERROR({ error }) {
    return this.set('error', error).set('loading', false);
  }
}
export default reducerFromClass(PointListReducer);
