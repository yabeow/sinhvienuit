import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Intro from './Intro';
import { setFirstTime } from './Action';


function mapDispatchToProps(dispatch) {
    return {
        setFirstTime: bindActionCreators(setFirstTime, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Intro)