import React, { PropTypes } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View, Text } from 'native-base';
import Deadline from './Item';

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
                    <Title>Deadline</Title>
                    </Body>
                    <Right />
                </Header>
                <View padder style={{ flex: 1 }}>
                    {
                        (this.props.deadlines.length === 0) &&
                        <Text>Không có deadline nào! Kéo xuống để cập nhật.</Text>
                    }
                    <FlatList
                        data={ this.props.deadlines }
                        horizontal={ false }
                        refreshing={ this.props.refreshing }
                        onRefresh={ () => this.props.onRefresh() }
                        keyExtractor={ course => course.getId() }
                        renderItem={ ({item}) =>
                            <Deadline deadline = { item }/>
                        }
                    />

                </View>
            </Container>
        )
    }
}
List.propsType = {
    deadlines: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default List;