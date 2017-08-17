const { Record, List } = require('immutable');
import { DRL_STUDENT_POINT_LINK_TEMPLATE } from '../../config/config';

/*
    id: Mã hoạt động.
    title: Tên hoạt động.
    point: Điểm được cộng/trừ.
 */

const InitStudentPoint = Record({
    id: false,
    title: false,
    point: false
});

export class StudentPoint extends InitStudentPoint {
    constructor(data) {
        super(data);
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getPoint() {
        return this.point;
    }
    getLink() {
        return DRL_STUDENT_POINT_LINK_TEMPLATE + this.id;
    }
}

const InitStudentPointList = Record({
    listPoints: List(),
    finalPoint: 0,
    loading: false,
    error: false
});

export default class StudentPointList extends InitStudentPointList {
    constructor(data) {
        super(data);
    }
    getListPoints() {
        return this.listPoints.toArray();
    }
    getFinalPoint() {
        return this.finalPoint;
    }
    getFinalRank() {
        //Loại kém
        if (this.finalPoint < 35) {
            return 1;
        }
        //Loại yếu
        else if (this.finalPoint < 50) {
            return 2;
        }
        //Loại trung bình
        else if (this.finalPoint < 65) {
            return 3;
        }
        //Loại khá
        else if (this.finalPoint < 80) {
            return 4;
        }
        //Loại giỏi
        else if (this.finalPoint < 90) {
            return 5;
        }
        //Loại xuất sắc
        else if (this.finalPoint <= 100) {
            return 6;
        }
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}