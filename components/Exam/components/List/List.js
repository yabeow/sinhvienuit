import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import { View } from 'native-base';
import Exam from './Item';
import EmptyList from '../../../EmptyList';

class List extends React.Component {
    render() {
        let exams = this.props.exams;
        //Sắp xếp theo thứ tự thời gian còn lại tăng dần.
        exams.sort(function(a, b) {
            let timeA, timeB;
            timeA = a.getTime();
            timeB = b.getTime();
            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;
            return 0;
        });
        if ((typeof this.props.onRefresh !== 'undefined') && (typeof this.props.refreshing !== 'undefined')) {
            return (
                <FlatList
                    ListEmptyComponent = { <EmptyList/> }
                    data={ this.props.exams }
                    horizontal={ false }
                    refreshing={ this.props.refreshing }
                    onRefresh={ () => this.props.onRefresh() }
                    keyExtractor={ item => item.getCode() + item.getTime() }
                    renderItem={ ({item}) =>
                        <Exam exam={ item }/>
                    }
                />
            )
        }
        else {
            return (
                <View>
                    {
                        this.props.exams.map(function (item) {
                            return <Exam exam = { item } key={ item.getCode() + item.getTime() }/>
                        })
                    }
                </View>
            );
        }
    }
}
List.propsType = {
    exams: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;