import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotification, setNotificationError } from './Action';
import notificationScreen from './Notification';

function mapStateToProps(state) {
  return {
    notifications: state.notifications.getAllNotifications(),
    refreshing: state.notifications.loading,
    error: state.notifications.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getNotification: bindActionCreators(getNotification, dispatch),
    setError: bindActionCreators(setNotificationError, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(notificationScreen);
