import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getExam, setExamError } from './Action';
import examScreen from './Exam';

function mapStateToProps(state) {
    return {
        exams: state.exams.getExams(),
        refreshing: state.exams.loading,
        error: state.exams.error
    }
}
function mapDispatchToProps(dispatch) {
    return {
        onRefresh: bindActionCreators(getExam, dispatch),
        setError: bindActionCreators(setExamError, dispatch)
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(examScreen);