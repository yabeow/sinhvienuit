import React, { PropTypes } from "react";
import { Alert } from 'react-native';
import { Body, Text, Button, Container, Icon, Toast, Content, Separator, ListItem, Switch, Left, Right, Card, CardItem } from "native-base";
import styles from '../../Style';
import Spinner from 'react-native-loading-spinner-overlay';

class User extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.user.getError()) {
            Toast.show({
                text: nextProps.user.getError(),
                position: 'bottom',
                buttonText: 'Bỏ qua',
                type: 'warning',
                duration: 10000
            });
            this.props.setUserError(false);
        }
        else {
            if ((nextProps.user.getLoading() === false) && (this.props.user.getLoading() === true)) {
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
    static navigationOptions = {
        title: 'Tài khoản',
        ...styles.Header
    };
    logout() {
        Alert.alert(
            'Xác nhận',
            'Bạn có thật sự muốn đăng xuất?',
            [
                {
                    text: 'OK',
                    onPress: () => this.props.logout()
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
            ],
            { cancelable: true }
        )
    }
    updateInformation() {
        this.props.getUserInformation();
    }
    render() {
        return (
            <Container style={{backgroundColor: '#FFF'}}>
                <Spinner visible={ this.props.user.getLoading() } textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <Content>
                    <Card>
                        <CardItem>
                            <Text>Họ tên: { this.props.user.getName() }</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Ngày sinh: { this.props.user.getBirthDay() }</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Khoa: { this.props.user.getFaculty() }</Text>
                        </CardItem>
                        <CardItem>
                            <Text>Hệ đào tạo: { this.props.user.getTrainType() }</Text>
                        </CardItem>
                    </Card>
                    <ListItem button onPress={ this.updateInformation.bind(this) } icon>
                        <Left>
                            <Button onPress={ this.updateInformation.bind(this) } info>
                                <Icon active name="refresh" />
                            </Button>
                        </Left>
                        <Body>
                        <Text>Cập nhật thông tin</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                    <ListItem button onPress={ this.logout.bind(this) } last icon>
                        <Left>
                            <Button onPress={ this.logout.bind(this) } danger>
                                <Icon active name="log-out" />
                            </Button>
                        </Left>
                        <Body>
                        <Text>Đăng xuất</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        )
    }
}
User.propTypes = {
  user: PropTypes.object.isRequired
};
export default User;