import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Details from './Details';

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);