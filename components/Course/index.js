import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CourseScreen from './Course';
import { getCourse } from './Action';

function mapStateToProps(state) {
    return {
        courses: state.courses,
        numberOfCourseNotificationsList: state.notifications.getNumberOfCourseNotificationsList()
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCourse: bindActionCreators(getCourse, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(CourseScreen);