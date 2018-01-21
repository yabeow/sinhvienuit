import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import {
  Button,
  Container,
  Body,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Content,
  Header,
  Title,
  Text,
  Left,
  Right,
  View,
} from 'native-base';
import { backAction, VERSION_NUMBER, FACEBOOK_PAGE, GITHUB_PAGE } from '../../config/config';
import logoSrc from '../../assets/logo.png';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.dispatch(backAction)} transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Giới thiệu</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.cardContainer}>
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Thumbnail square style={{ backgroundColor: '#2196F3' }} source={logoSrc} />
                <Body>
                  <Text>Sinh viên UIT</Text>
                  <Text note>v{VERSION_NUMBER}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Sinh viên UIT là một ứng dụng mã nguồn mở và phi lợi nhuận được tạo ra nhằm mục
                  đích hỗ trợ các sinh viên ĐH CNTT - ĐHQG TP.HCM(*) trong việc học tập và sinh hoạt
                  tại trường.
                </Text>
                <Text />
                <Text>Tác giả: Bùi Đại Gia - SV khóa 2016 ngành An toàn thông tin.</Text>
                <Text />
                <Text>"Một món quà dành cho Trâu, heo, chó, mèo và chuột".</Text>
                <Text />
                <Text style={{ fontSize: 12 }}>(*) Ứng dụng là một sản phẩm độc lập, không chính thức. Mọi bản quyền về thương hiệu và hình ảnh thuộc về trường ĐH Công nghệ thông tin - ĐHQG TP.HCM.</Text>
              </Body>
            </CardItem>
            <CardItem style={styles.buttonContainer}>
              <Button
                onPress={() => Linking.openURL(FACEBOOK_PAGE)}
                style={{ backgroundColor: '#3B5998' }}
              >
                <Icon name="logo-facebook" />
                <Text style={{ paddingLeft: 2 }}>Facebook</Text>
              </Button>
              <Button
                onPress={() => Linking.openURL(GITHUB_PAGE)}
                style={{ backgroundColor: '#6e5494' }}
              >
                <Icon name="logo-github" />
                <Text style={{ paddingLeft: 2 }}>GitHub</Text>
              </Button>
            </CardItem>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 0,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
