import { DRL_STUDENT_POINT_LINK_TEMPLATE } from '../../config/config';

const { Record, List } = require('immutable');

/*
    id: Mã hoạt động.
    title: Tên hoạt động.
    point: Điểm được cộng/trừ.
 */

const InitStudentPoint = Record({
  id: false,
  title: false,
  point: false,
});

export class StudentPoint extends InitStudentPoint {
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
  error: '',
});

export default class StudentPointList extends InitStudentPointList {
  getListPoints() {
    return this.listPoints.toArray();
  }
  getFinalPoint() {
    return this.finalPoint;
  }
  getFinalRank() {
    // Loại kém
    if (this.finalPoint < 35) {
      return 1;
    } else if (this.finalPoint < 50) {
      // Loại yếu
      return 2;
    } else if (this.finalPoint < 65) {
      // Loại trung bình
      return 3;
    } else if (this.finalPoint < 80) {
      // Loại khá
      return 4;
    } else if (this.finalPoint < 90) {
      // Loại giỏi
      return 5;
    } else if (this.finalPoint <= 100) {
      // Loại xuất sắc
      return 6;
    }
    return 0;
  }
  getLoading() {
    return this.loading;
  }
  getError() {
    return this.error;
  }
}
