import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, Content } from 'native-base';
import ListItem from './Item';

class List extends React.Component {
    static navigationOptions = {
        header: null
    };
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.navigate('DrawerOpen') } transparent>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Môn học</Title>
                    </Body>
                    <Right />
                </Header>
                <FlatList
                    data={ this.props.courses }
                    horizontal={ false }
                    refreshing={ this.props.refreshing }
                    onRefresh={ () => this.props.onRefresh() }
                    keyExtractor={ course => course.getCode() + course.getDayOfWeek() + course.getLessonStart()  }
                    renderItem={ ({item}) => 
                        <ListItem
                            course={ item }
                            navigation={ this.props.navigation }
                            numberNotifications={ this.props.numberOfCourseNotificationsList[item.getCode()] }
                            numberDeadlines={ this.props.numberOfDeadlinesList[item.getCode()] }
                        /> 
                    }
                />
            </Container>
        )
    }
}
List.propsType = {
    courses: PropTypes.array.isRequired,
    listOfDeadLines: PropTypes.object,
    numberOfCourseNotificationsList: PropTypes.object,
    numberOfDeadlinesList: PropTypes.object,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;