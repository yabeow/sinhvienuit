import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from './Deadline';
import { getDeadline, setDeadlineError } from './Action';

function mapStateToProps(state) {
  return {
    deadlines: state.deadlines.getDeadlines(),
    error: state.deadlines.error,
    refreshing: state.deadlines.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRefresh: bindActionCreators(getDeadline, dispatch),
    setError: bindActionCreators(setDeadlineError, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
