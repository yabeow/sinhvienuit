import { Record } from 'immutable';
/*
    name: Tên sinh viên.
    faculty: Khoa đang học.
    birthDay: Ngày tháng năm sinh.
    trainType: Hệ đào tạo (CQĐT, TN,...).
    picture: Ảnh sinh viên.
    loading: Trạng thái chạy.
    error: Thông tin lỗi.
 */
const InitUser = Record({
    name: false,
    faculty: false,
    birthDay: false,
    trainType: false,
    picture: false,
    loading: false,
    error: false
});
export default class User extends InitUser {
    getName() {
        return this.name;
    }
    getFaculty() {
        return this.faculty;
    }
    getBirthDay() {
        return this.birthDay;
    }
    getTrainType() {
        return this.trainType;
    }
    getPiture() {
        return this.picture;
    }
    getLoading() {
        return this.loading;
    }
    getError() {
        return this.error;
    }
}