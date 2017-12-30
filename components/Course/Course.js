import { StackNavigator } from 'react-navigation';
import ListScreen from './components/List';
import DetailsScreen from './components/Details/indexNavigation';

const CourseNavigator = StackNavigator({
  CourseList: { screen: ListScreen },
  CourseDetails: { screen: DetailsScreen },
});
CourseNavigator.navigationOptions = {
  header: null,
};
export default CourseNavigator;
