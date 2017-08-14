import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from './List';
import { getCourse } from '../../Action';

function mapStateToProps(state) {
    return {
        courses: state.courses.getAllCourses(),
        refreshing: state.courses.loading,
        numberOfCourseNotificationsList: state.notifications.getNumberOfCourseNotificationsList(),
        numberOfDeadlinesList: state.deadlines.getNumberOfDeadlinesList(),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRefresh: bindActionCreators(getCourse, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(List);