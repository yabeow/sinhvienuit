import React from 'react';
import { Content } from 'native-base';
import ListScreen from './compoments/List';
import styles from '../../Style';

class Course extends React.Component {
    static navigationOptions = {
        title: 'Môn học',
        ...styles.Header
    };
    render() {
        let navigation = false;
        if (typeof this.props.navigation !== 'undefined') {
            navigation = this.props.navigation;
        }
        return (
            <ListScreen
                courses = { this.props.courses.getAllCourses().toArray() }
                refreshing = { this.props.courses.getLoading() }
                onRefresh = { this.props.getCourse }
                navigation = { navigation }
            />
        )
    }
}
export default Course;