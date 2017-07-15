import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import rootScreen from './Navigator';
function mapStateToProps(state) {
    return {
        numberOfCourses: state.courses.getNumberOfCourses(),
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(rootScreen)