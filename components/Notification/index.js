import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNotification } from './Action';
import notificationScreen from './Notification';

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getNotification: bindActionCreators(getNotification, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(notificationScreen)