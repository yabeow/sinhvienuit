import React, { PropTypes } from 'react';
import { Image, View, TouchableOpacity, Linking, KeyboardAvoidingView, Animated, Keyboard } from 'react-native';
import { Root, Container, Spinner, Button, Text, Toast, Icon, Item, Input } from 'native-base';
import { FORGOT_PASSWORD_RESET_PAGE } from '../../config/config';
import styles from './Style';
import { LOGO_SIZE_DEFAULT, LOGO_SIZE_SMALL } from './Style';
import bgSrc from '../../assets/background-uit.png';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: false,
            password: false,
            errorUsername: false,
            errorPassword: false,
            showTitle: true
        };
        this.imageSize = new Animated.Value(LOGO_SIZE_DEFAULT);
    }
    componentWillMount () {
        this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
        this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
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
            this.props.setLoginError(false);
        }
    }
    componentWillUnmount() {
        //Fetch dữ liệu sau khi đăng nhập.
        this.props.getCourse();
        this.props.getDeadline();
        this.props.getNotification();
        this.props.getStudentPoint();
        this.props.getUser();

        //Remove listener
        this.keyboardWillShowSub.remove();
        this.keyboardWillHideSub.remove();
    }
    keyboardWillShow = (event) => {
        this.setState({ showTitle: false });
        Animated.timing(this.imageSize, {
            duration: event.duration,
            toValue: LOGO_SIZE_SMALL,
        }).start();
    };

    keyboardWillHide = (event) => {
        this.setState({ showTitle: true });
        Animated.timing(this.imageSize, {
            duration: event.duration,
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
        }
        else {
            //Lỗi username
            if (!this.state.username) {
                this.setState({ errorUsername: true });
            }
            //Lỗi password
            if (!this.state.password) {
                this.setState({ errorPassword: true });
            }
        }
    }
    render() {
        return (
            <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover', }} source={bgSrc}>
                <Container style = { styles.Container }>
                    <KeyboardAvoidingView style = { styles.FormView } behavior="padding">
                        <View style={ styles.LogoView }>
                            <Animated.Image style={{ height: this.imageSize, width: this.imageSize }} source={ require('../../assets/logo.png') }/>
                        </View>
                        <Item style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} rounded label="Username" error={ this.state.errorUsername }>
                            <Icon active name='person' style={{ color: 'white' }}/>
                            <Input keyboardType='numeric' placeholderTextColor={'white'} style={{ color: 'white' }} placeholder='Mã số sinh viên' onChangeText={ (username) => this.setState({ username }) }/>
                        </Item>
                        <Item style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', top: 5 }} rounded label="Password" error={ this.state.errorPassword }>
                            <Icon active name='lock' style={{ color: 'white' }}/>
                            <Input placeholderTextColor={'white'} style={{ color: 'white' }} placeholder='Mật khẩu chứng thực' secureTextEntry onChangeText={ (password) => this.setState({password}) }/>
                        </Item>
                        <View style={{ ...styles.Button }}>
                            {
                                (this.props.loading === true) ? <Spinner color='white'/> : 
                                <Button bordered light title="Đăng nhập" onPress={ this.Login.bind(this) } disabled={(this.props.loading === true) ? true : null}>
                                    <Text style={{ textAlign: 'center' }}> Đăng nhập </Text>
                                </Button>
                            }
                        </View>
                    </KeyboardAvoidingView>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={ () => Linking.openURL() }>
                            <Text style={ styles.Text }>Chính sách & Điều khoản</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => Linking.openURL(FORGOT_PASSWORD_RESET_PAGE) }>
                            <Text style={ styles.Text }>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                </Container>
            </Image>
        );
    }
}
LoginForm.propsType = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
};
export default LoginForm;