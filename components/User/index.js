import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userScreen from './User';
import { logout } from '../Login/Action';
import { getUser, setUserError } from './Action';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
    getUser: bindActionCreators(getUser, dispatch),
    setUserError: bindActionCreators(setUserError, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(userScreen);
