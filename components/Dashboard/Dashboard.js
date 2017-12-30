import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  Button,
  Container,
  Icon,
  Content,
  Header,
  Title,
  Text,
  Left,
  Right,
  View,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import MenuItem from './MenuItem';
import bgImage from '../../assets/background-uit.png';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Image style={{ flex: 1, width: null, height: null, resizeMode: 'cover' }} source={bgImage}>
        <Container
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <Content padder>
            <View style={styles.LogoView}>
              <Image style={styles.Logo} source={require('../../assets/logo.png')} />
              <Text
                style={{
                  color: 'white',
                  textShadowColor: 'grey',
                  textShadowOffset: { height: 2, width: 2 },
                  fontSize: 25,
                  fontWeight: 'bold',
                  top: 10,
                  paddingBottom: 30,
                }}
              >
                SINH VIÊN UIT
              </Text>
            </View>
            <Grid>
              <Row>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Notification')}>
                    <MenuItem backgroundColor="#2196F3" icon="text" text="Thông báo" />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Course')}>
                    <MenuItem
                      backgroundColor="#673AB7"
                      icon="calendar"
                      text="Môn học"
                      badgeNumber={this.props.numberOfCourses}
                      badgeColor="info"
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Deadline')}>
                    <MenuItem
                      backgroundColor="#E91E63"
                      icon="list-box"
                      text="Deadline"
                      badgeNumber={this.props.numberOfDeadlines}
                      badgeColor="warning"
                    />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('StudentPoint')}>
                    <MenuItem
                      backgroundColor="#4CAF50"
                      icon="body"
                      text="Điểm rèn luyện"
                      badgeNumber={this.props.finalStudentPoint}
                      badgeColor="primary"
                    />
                  </TouchableOpacity>
                </Col>
              </Row>
              <Row>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('Exam')}>
                    <MenuItem backgroundColor="#607D8B" icon="school" text="Lịch thi" />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('User')}>
                    <MenuItem backgroundColor="#009688" icon="contact" text="Tài khoản" />
                  </TouchableOpacity>
                </Col>
              </Row>
            </Grid>
          </Content>
        </Container>
      </Image>
    );
  }
}
styles = StyleSheet.create({
  LogoView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15,
  },
  Logo: {
    height: 160,
    width: 160,
  },
  container: {
    flex: 1,
    margin: 15,
  },
});
