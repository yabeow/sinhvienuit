import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import studentScreen from './StudentPoint';
import { getStudentPoint, setPointError } from './Action';

function mapStateToProps(state) {
  return {
    studentPoints: state.studentPoints.getListPoints(),
    refreshing: state.studentPoints.loading,
    error: state.studentPoints.error,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    onRefresh: bindActionCreators(getStudentPoint, dispatch),
    setError: bindActionCreators(setPointError, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(studentScreen);
