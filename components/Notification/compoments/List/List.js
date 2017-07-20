import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import { View } from 'native-base';
import Notification from './Item';
class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if ((typeof this.props.onRefresh !== 'undefined') && (typeof this.props.refreshing !== 'undefined')) {
            return (
                <FlatList
                    data={ this.props.notifications }
                    refreshing={ this.props.refreshing }
                    onRefresh={ () => this.props.onRefresh() }
                    keyExtractor={ item => item.getLink() }
                    renderItem={ ({item}) => <Notification notification={ item }/> }
                />
            )
        }
        else {
            return (
                <View>
                    {
                        this.props.notifications.map(function (item) {
                            return <Notification notification={ item } key={ item.getCode() }/>
                        })
                    }
                </View>
            )
        }
    }
}
List.propsType = {
    notifications: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;