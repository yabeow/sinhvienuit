import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dashboardScreen from './Dashboard';
import { getDeadline } from '../Deadline/Action';
import { getNotification } from '../Notification/Action';
import { getStudentPoint } from '../StudentPoint/Action';
import { getExam } from '../Exam/Action';

function mapStateToProps(state) {
  return {
    numberOfCourses: state.courses.getNumberOfCourses().toString(),
    numberOfDeadlines: state.deadlines.getNumberOfDeadlines().toString(),
    finalStudentPoint: state.studentPoints.getFinalPoint().toString(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getNotification: bindActionCreators(getNotification, dispatch),
    getDeadline: bindActionCreators(getDeadline, dispatch),
    getStudentPoint: bindActionCreators(getStudentPoint, dispatch),
    getExam: bindActionCreators(getExam, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboardScreen);
