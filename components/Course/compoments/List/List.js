import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import ListItem from './Item';
class List extends React.Component {
    render() {
        return (
            <FlatList
                data={ this.props.courses }
                horizontal={ false }
                refreshing={ this.props.refreshing }
                onRefresh={ () => this.props.onRefresh() }
                keyExtractor={ course => course.getCode() + course.getDayOfWeek() + course.getLessonStart()  }
                renderItem={ ({item}) => <ListItem course={ item } navigation={ this.props.navigation }/> }
            />
        )
    }
}
List.propsType = {
    courses: PropTypes.array.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func
};
export default List;