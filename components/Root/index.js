import React from "react";
import { connect } from "react-redux";
import rootScreen from "./Root";

function mapStateToProps(state) {
  return {
    firstTime: state.firstTime,
    loggedIn: state.login.loggedIn,
  };
}
export default connect(mapStateToProps)(rootScreen);
