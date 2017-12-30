const { Record } = require('immutable');

/*
    username: Tên đăng nhập (Mã SV).
    password: Mật khẩu chứng thực.
    loggedIn: Đánh dấu đăng nhập hay chưa?
 */
const InitLogin = Record({
  username: '',
  password: '',
  loading: false,
  error: '',
  loggedIn: false,
});

export default class Login extends InitLogin {
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
