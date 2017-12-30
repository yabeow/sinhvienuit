import React from 'react';
import Details from './index';
import styles from '../../../../Style';

export default class extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.course.getName(),
    ...styles.Header,
  });
  render() {
    const { course } = this.props.navigation.state.params;
    return <Details course={course} />;
  }
}
