import React, { PropTypes } from "react";
import { Image } from 'react-native';
import { Container, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';
import ListStudentPoint from './components/List';

class StudentPoint extends React.Component {
    constructor(data) {
        super(data);
    }
    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={ () => this.props.navigation.navigate('DrawerOpen') } transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Điểm rèn luyện</Title>
                    </Body>
                    <Right />
                </Header>
                <View padder style = {{ flex: 1 }}>
                    {
                        (this.props.studentPoints.length === 0) ?
                            <Image
                                resizeMode="contain"
                                style={{flex: 1, height: undefined, width: undefined}}
                                source={ require('../../assets/pull-to-refresh.gif')}
                            >
                                <ListStudentPoint
                                    studentPoints={ this.props.studentPoints }
                                    refreshing={ this.props.loading }
                                    onRefresh={ this.props.onRefresh }
                                />
                            </Image>
                            :
                            <ListStudentPoint
                                studentPoints={ this.props.studentPoints }
                                refreshing={ this.props.loading }
                                onRefresh={ this.props.onRefresh }
                            />
                    }
                </View>
            </Container>
        );
    }
}

StudentPoint.propTypes = {

};
export default StudentPoint;