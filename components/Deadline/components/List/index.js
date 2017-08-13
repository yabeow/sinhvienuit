import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from './List';
import { getDeadline } from '../../Action';

function mapStateToProps(state) {
    return {
        deadlines: state.deadlines.getAllDeadlines(),
        refreshing: state.deadlines.loading,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onRefresh: bindActionCreators(getDeadline, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(List);