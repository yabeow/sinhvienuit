import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rootScreen from './Root';
function mapStateToProps(state) {
    return {
        loggedIn: state.login.loggedIn
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(rootScreen)