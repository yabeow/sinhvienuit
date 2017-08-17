import React, { PropTypes } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { Container } from 'native-base';
import StudentPoint from './Item';
import FinalPoint from '../Final';
import EmptyList from '../../../EmptyList';

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
                        refreshing={ this.props.refreshing }
                        onRefresh={ () => this.props.onRefresh() }
                        keyExtractor={ item => item.getId() }
                        renderItem={ ({item}) => <StudentPoint studentPoint={ item }/> }
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