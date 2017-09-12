import React, { PropTypes } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import StudentPoint from './Item';
import FinalPoint from '../Final';
import EmptyList from '../../../EmptyList';
import { ANDROID_PULL_TO_REFRESH_COLOR } from '../../../../config/config';

class List extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if ((typeof this.props.onRefresh !== 'undefined') && (typeof this.props.refreshing !== 'undefined')) {
            return (
                <Container>
                    <FlatList
                        ListHeaderComponent = { <FinalPoint/> }
                        ListEmptyComponent = { <EmptyList/> }
                        data={ this.props.studentPoints }
                        keyExtractor={ item => item.getId() }
                        renderItem={ ({item}) => <StudentPoint studentPoint={ item }/> }
                        refreshControl={
                            <RefreshControl
                                refreshing={ this.props.refreshing }
                                onRefresh={ () => this.props.onRefresh() }
                                colors={ ANDROID_PULL_TO_REFRESH_COLOR }
                            />
                        }
                    />
                </Container>
            )
        }
        else {
            return (
                <View>
                    {
                        this.props.studentPoints.map(function (item) {
                            return <StudentPoint studentPoint={ item } key={ item.getId() }/>
                        })
                    }
                </View>
            )
        }
    }
}
List.propsType = {
    studentPoints: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;