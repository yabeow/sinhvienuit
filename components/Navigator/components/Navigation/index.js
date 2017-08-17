import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
function mapStateToProps(state) {
    return {
        numberOfCourses: state.courses.getNumberOfCourses(),
        numberOfDeadlines: state.deadlines.getNumberOfDeadlines(),
        finalStudentPoint: state.studentPoints.getFinalPoint(),
    }
}
export default connect(mapStateToProps)(Navigation)