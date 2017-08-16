import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import studentScreen from './StudentPoint';
import { getStudentPoint } from './Action';

function mapStateToProps(state) {
    return {
        studentPoints: state.studentPoints.getListPoints(),
        loading: state.studentPoints.getLoading()
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onRefresh: bindActionCreators(getStudentPoint, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(studentScreen)