import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUsername, setPassword, setLoginError, login, logout } from './Action';
import { getCourse } from '../Course/Action';
import { getUser } from '../User/Action';
import loginScreen from './Login';

function mapStateToProps(state) {
  return {
    loading: state.login.loading,
    username: state.login.username,
    password: state.login.password,
    error: state.login.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUsername: bindActionCreators(setUsername, dispatch),
    setPassword: bindActionCreators(setPassword, dispatch),
    setLoginError: bindActionCreators(setLoginError, dispatch),
    login: bindActionCreators(login, dispatch),
    logout: bindActionCreators(logout, dispatch),
    getCourse: bindActionCreators(getCourse, dispatch),
    getUser: bindActionCreators(getUser, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(loginScreen);
