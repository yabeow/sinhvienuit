const { Record } = require('immutable');

/*
    username: Tên đăng nhập (Mã SV).
    password: Mật khẩu chứng thực.
    loggedIn: Đánh dấu đăng nhập hay chưa?
 */
const InitLogin = Record({
    username: false,
    password: false,
    loading: false,
    error: false,
    loggedIn: false
});

export default class Login extends InitLogin {
    constructor(data) {
        super(data);
    }
    getUsername() {
        return this.username;
    }
    getPassword() {
        return this.password;
    }
    getLoading() {
        return this.password;
    }
    getLoggedIn() {
        return this.loggedIn;
    }
}