import { connect } from 'react-redux';
import Details from './Details';

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    deadlines: state.deadlines,
  };
}

function mapDispatchToProps() {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Details);
