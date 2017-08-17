import { reducerFromClass } from '../../utils';
import DeadlineList from './Object';
export class DeadlineListReducer extends DeadlineList {
    constructor(data) {
        super(data);
    }
    //Thêm một deadline cho môn học.
    ADD_DEADLINE({ deadline }) {
        for(let item of this.listDeadlines) {
            if (item.getId() === deadline.getId()) {
                //Thông báo bị trùng.
                return this;
            }
        }
        let listDeadlines = this.listDeadlines.push(deadline);
        return this.set('listDeadlines', listDeadlines);
    }
    //Set status cho deadline.
    SET_DEADLINE_STATUS({ id, status }) {
        this.listDeadlines.map(function(item) {
            if (item.getId() === id) {
                return item.set('status', status);
            }
            return item;
        });
    }
    //Set loading.
    SET_DEADLINE_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    //Set lỗi.
    SET_DEADLINE_ERROR({ error }) {
        return this.set('error', error);
    }
}
export default reducerFromClass(DeadlineListReducer);