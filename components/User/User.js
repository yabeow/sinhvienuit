import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, ImageBackground } from 'react-native';
import {
  Header,
  Title,
  Body,
  View,
  Text,
  Button,
  Container,
  Icon,
  Toast,
  Content,
  ListItem,
  Left,
  Right,
  Card,
  CardItem,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { backAction } from '../../config/config';
import bgImage from '../../assets/background-uit.png';
import noAvatar from '../../assets/noavatar.jpg';

class User extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.updateInformation = this.updateInformation.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.getError()) {
      Toast.show({
        text: nextProps.user.getError(),
        position: 'bottom',
        buttonText: 'Bỏ qua',
        type: 'warning',
        duration: 10000,
      });
      this.props.setUserError(false);
    } else if (nextProps.user.getLoading() === false && this.props.user.getLoading() === true) {
      Toast.show({
        text: 'Cập nhật thông tin thành công',
        position: 'bottom',
        buttonText: 'Bỏ qua',
        type: 'success',
        duration: 10000,
      });
    }
  }
  logout() {
    Alert.alert(
      'Xác nhận',
      'Bạn có thật sự muốn đăng xuất?',
      [
        {
          text: 'OK',
          onPress: () => this.props.logout(),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  }
  updateInformation() {
    this.props.getUser();
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.dispatch(backAction)} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Tài khoản</Title>
          </Body>
          <Right />
        </Header>
        <Spinner
          visible={this.props.user.getLoading()}
          textContent="Loading..."
          textStyle={{ color: '#FFF' }}
        />
        <ImageBackground
          style={{ flex: 1 }}
          imageStyle={{ width: null, height: null, resizeMode: 'cover' }}
          source={bgImage}
        >
          <Content style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} padder>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: 15,
              }}
            >
              {this.props.user.getPicture() ? (
                <Image style={styles.Logo} source={{ uri: this.props.user.getPicture() }} />
              ) : (
                <Image style={styles.Logo} source={noAvatar} />
              )}
            </View>
            <Card>
              <CardItem style={styles.cardView}>
                <Text>Họ tên</Text>
                <Text>{this.props.user.getName()}</Text>
              </CardItem>
              <CardItem style={styles.cardView}>
                <Text>Ngày sinh</Text>
                <Text>{this.props.user.getBirthDay()}</Text>
              </CardItem>
              <CardItem style={styles.cardView}>
                <Text>Khoa</Text>
                <Text>{this.props.user.getFaculty()}</Text>
              </CardItem>
              <CardItem style={styles.cardView}>
                <Text>Hệ đào tạo</Text>
                <Text>{this.props.user.getTrainType()}</Text>
              </CardItem>
            </Card>
            <Card>
              <ListItem button onPress={() => this.updateInformation()} icon>
                <Left>
                  <Button onPress={() => this.updateInformation()} info>
                    <Icon active name="refresh" />
                  </Button>
                </Left>
                <Body>
                  <Text>Cập nhật thông tin</Text>
                </Body>
                <Right />
              </ListItem>
              <ListItem button onPress={() => this.logout()} icon>
                <Left>
                  <Button onPress={() => this.logout()} danger>
                    <Icon active name="log-out" />
                  </Button>
                </Left>
                <Body>
                  <Text>Đăng xuất</Text>
                </Body>
                <Right />
              </ListItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}
const styles = {
  LogoView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  Logo: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 6,
  },
  container: {
    flex: 1,
    margin: 15,
  },
  cardView: { flexDirection: 'row', justifyContent: 'space-between' },
};
User.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  setUserError: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};
export default User;
