import React from 'react';
import { connect } from 'react-redux';
import FinalPoint from './Final';
function mapStateToProps(state) {
    return {
        finalPoint: state.studentPoints.finalPoint,
        finalRank: state.studentPoints.getFinalRank()
    }
}
export default connect(mapStateToProps)(FinalPoint)