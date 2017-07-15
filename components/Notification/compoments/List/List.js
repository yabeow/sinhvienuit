import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import Notification from './Item';
class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
        }
    }
    render() {
        return (
            <FlatList
                data = { this.props.notifications }
                refreshing = { this.props.refreshing }
                onRefresh = { () => this.props.onRefresh() }
                keyExtractor = { item => item.getLink() }
                renderItem = { ({ item }) => <Notification notification={ item }/> }
            />
        )
    }
}
List.propsType = {
    notifications: PropTypes.array.isRequired,
    refreshing: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func
};
export default List;