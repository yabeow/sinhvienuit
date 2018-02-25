import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from './List';
import { getCourse, setCourseError, addListCourseCalendar } from '../../Action';

function mapStateToProps(state) {
  return {
    courses: state.courses.getAllCourses(),
    error: state.courses.error,
    refreshing: state.courses.loading,
    numberOfCourseNotificationsList: state.notifications.getNumberOfCourseNotificationsList(),
    numberOfDeadlinesList: state.deadlines.getNumberOfDeadlinesList(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addListCourseCalendar: bindActionCreators(addListCourseCalendar, dispatch),
    onRefresh: bindActionCreators(getCourse, dispatch),
    setError: bindActionCreators(setCourseError, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
