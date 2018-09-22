import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  ImageBackground,
  View,
  TouchableOpacity,
  Linking,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { Container, Spinner, Button, Text, Toast, Icon, Item, Input } from 'native-base';
import { FORGOT_PASSWORD_RESET_PAGE, POLICY_PAGE } from '../../config/config';
import styles, { LOGO_SIZE_DEFAULT, LOGO_SIZE_SMALL } from './Style';
import bgSrc from '../../assets/background-uit.png';
import logoImg from '../../assets/logo.png';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: false,
      password: false,
      errorUsername: false,
      errorPassword: false,
    };
    this.imageSize = new Animated.Value(LOGO_SIZE_DEFAULT);
  }
  componentWillMount() {
    if (Platform.OS === 'android') {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    } else {
      this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
      this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      Toast.show({
        text: nextProps.error,
        position: 'bottom',
        buttonText: 'Bỏ qua',
        type: 'warning',
        duration: 10000,
      });
      this.props.setLoginError('');
    }
  }
  componentWillUnmount() {
    // Fetch dữ liệu sau khi đăng nhập.
    this.props.getCourse(true);
    this.props.getUser();

    // Remove listener
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardWillShow = (event) => {
    Animated.timing(this.imageSize, {
      duration: event.duration,
      toValue: LOGO_SIZE_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageSize, {
      duration: event.duration,
      toValue: LOGO_SIZE_DEFAULT,
    }).start();
  };

  keyboardDidShow = (event) => {
    Animated.timing(this.imageSize, {
      duration: event.duration,
      toValue: LOGO_SIZE_SMALL,
    }).start();
  };

  keyboardDidHide = () => {
    Animated.timing(this.imageSize, {
      duration: 1000,
      toValue: LOGO_SIZE_DEFAULT,
    }).start();
  };
  Login() {
    if (this.state.username && this.state.password) {
      this.setState({ errorUsername: false });
      this.setState({ errorPassword: false });
      this.props.setUsername(this.state.username);
      this.props.setPassword(this.state.password);
      this.props.login('DAA', this.state.username, this.state.password);
    } else {
      // Lỗi username
      if (!this.state.username) {
        this.setState({ errorUsername: true });
      }
      // Lỗi password
      if (!this.state.password) {
        this.setState({ errorPassword: true });
      }
    }
  }
  render() {
    return (
      <ImageBackground
        style={{
          flex: 1,
        }}
        imageStyle={{
          width: null,
          height: null,
          resizeMode: 'cover',
        }}
        source={bgSrc}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container style={styles.Container}>
            <View style={styles.LogoView}>
              <Animated.Image
                style={[...styles.Logo, { height: this.imageSize, width: this.imageSize }]}
                source={logoImg}
              />
            </View>
            <Item
              style={{ backgroundColor: 'white' }}
              rounded
              label="Username"
              error={this.state.errorUsername}
            >
              <Icon active name="person" style={{ color: 'grey' }} />
              <Input
                placeholder="Mã số sinh viên"
                onChangeText={username => this.setState({ username })}
              />
            </Item>
            <Item
              style={{ backgroundColor: 'white' }}
              rounded
              label="Password"
              error={this.state.errorPassword}
            >
              <Icon active name="lock" style={{ color: 'grey' }} />
              <Input
                placeholder="Mật khẩu chứng thực"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <View style={styles.Button}>
              {this.props.loading === true ? (
                <Spinner color="white" />
              ) : (
                <Button
                  title="Đăng nhập"
                  onPress={() => this.Login()}
                  disabled={this.props.loading === true ? true : null}
                >
                  <Text style={{ textAlign: 'center' }}> Đăng nhập </Text>
                </Button>
              )}
            </View>
            <View style={{ top: 40, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => Linking.openURL(POLICY_PAGE)}>
                <Text style={styles.Text}>Chính sách & Điều khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL(FORGOT_PASSWORD_RESET_PAGE)}>
                <Text style={styles.Text}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>
          </Container>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
  }
}

LoginForm.defaultProps = {
  error: '',
  loading: false,
};

LoginForm.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  getCourse: PropTypes.func.isRequired,
};
export default LoginForm;
