import { connect } from 'react-redux';
import dashboardScreen from './Dashboard';

function mapStateToProps(state) {
  return {
    numberOfCourses: state.courses.getNumberOfCourses().toString(),
    numberOfDeadlines: state.deadlines.getNumberOfDeadlines().toString(),
    finalStudentPoint: state.studentPoints.getFinalPoint().toString(),
  };
}
export default connect(mapStateToProps)(dashboardScreen);
