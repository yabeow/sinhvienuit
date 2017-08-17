import React, { PropTypes } from "react";
import { Container, Header, Left, Button, Icon, Body, Title, Right, View, Toast } from 'native-base';
import ListStudentPoint from './components/List';

class StudentPoint extends React.Component {
    constructor(data) {
        super(data);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            Toast.show({
                text: nextProps.error,
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setError(false);
        }
        else {
            if ((nextProps.refreshing === false) && (this.props.refreshing === true)) {
                Toast.show({
                    text: 'Cập nhật thông tin thành công.',
                    position: 'bottom',
                    buttonText: 'Bỏ qua',
                    type: 'success',
                    duration: 10000
                });
            }
        }
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
                    <ListStudentPoint
                        studentPoints={ this.props.studentPoints }
                        refreshing={ this.props.refreshing }
                        onRefresh={ this.props.onRefresh }
                    />
                </View>
            </Container>
        );
    }
}

StudentPoint.propTypes = {
    studentPoints: PropTypes.array.isRequired,
    refreshing: PropTypes.bool,
    onRefresh: PropTypes.func
};
export default StudentPoint;