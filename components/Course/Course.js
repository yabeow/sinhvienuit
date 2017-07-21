import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListScreen from './compoments/List';
import DetailsScreen from './compoments/Details/indexNavigation';

const CourseNavigator = StackNavigator({
    CourseList: { screen: ListScreen },
    CourseDetails: { screen: DetailsScreen }
});
export default CourseNavigator;