import { reducerFromClass } from '../../utils';
import PointList from './Object';

export class PointListReducer extends PointList {
    constructor(data) {
        super(data);
    }
    //Thêm một hoạt động.
    ADD_POINT({ point }) {
        for(let item of this.listPoints) {
            if (item.getId() === point.getId()) {
                //Hoạt động bị trùng.
                return this;
            }
        }
        let listPoints = this.listPoints.push(point);
        return this.set('listPoints', listPoints);
    }
    SET_FINAL_POINT({ point }) {
        if (point >= 0) {
            return this.set('finalPoint', point);
        }
    }
    //Set loading.
    SET_POINT_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    //Set lỗi.
    SET_POINT_ERROR({ error }) {
        return this.set('error', error);
    }
}
export default reducerFromClass(PointListReducer);