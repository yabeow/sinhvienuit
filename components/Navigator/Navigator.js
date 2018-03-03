import React from 'react';
import { StackNavigator } from 'react-navigation';
import Dashboard from '../Dashboard';
import Notification from '../Notification';
import Deadline from '../Deadline';
import Course from '../Course';
import StudentPoint from '../StudentPoint';
import Exam from '../Exam';
import User from '../User';
import About from '../About';
import WebBrowser from '../WebBrowser';
import NavigatorAction from './Action';

const RootNavigator = StackNavigator({
  Dashboard: { screen: Dashboard },
  Notification: { screen: Notification },
  Deadline: { screen: Deadline },
  Course: { screen: Course },
  StudentPoint: { screen: StudentPoint },
  Exam: { screen: Exam },
  User: { screen: User },
  About: { screen: About },
  WebBrowser: { screen: WebBrowser },
});

export default class NavigatorRoot extends React.Component {
  render() {
    return (
      <RootNavigator
        ref={(navigatorRef) => {
          NavigatorAction.setContainer(navigatorRef);
        }}
      />
    );
  }
}
