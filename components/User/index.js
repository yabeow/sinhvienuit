import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userScreen from './User';
import { logout } from '../Login/Action';
import { getUserInformation, setUserError } from './Action';
function mapStateToProps(state) {
    return {
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
        getUserInformation: bindActionCreators(getUserInformation, dispatch),
        setUserError: bindActionCreators(setUserError, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(userScreen)