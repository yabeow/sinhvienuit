import React from "react";
import { Image, TouchableOpacity } from 'react-native';
import { Button, Container, Icon, Content, Header, Title, H3, Left, Right, View } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import MenuItem from './MenuItem';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Container style = {{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Content padder>
                    <View style={ styles.LogoView }>
                        {
                            (this.props.studentPicture) ?
                                <Image style={ styles.Logo } source={{ uri : this.props.studentPicture }}/>
                                :
                                <Image style={ styles.Logo } source={ require('../../assets/noavatar.jpg') }/>
                        }
                        {
                            (this.props.studentName) ?
                                <H3 style = {{ color:"grey", marginTop: 10 }}>{ this.props.studentName }</H3>
                                :
                                <H3 style = {{ color:"grey", marginTop: 10 }}>Sinh viên</H3>
                        }
                    </View>
                    <Grid>
                        <Row>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("Notification") }>
                                    <MenuItem backgroundColor='#2196F3' icon='text' text='Thông báo'/>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("Course") }>
                                    <MenuItem
                                        backgroundColor='#673AB7'
                                        icon='calendar'
                                        text='Môn học'
                                        badgeNumber={ this.props.numberOfCourses }
                                        badgeColor='info'
                                    />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("Deadline") }>
                                    <MenuItem
                                        backgroundColor='#E91E63'
                                        icon='list-box'
                                        text='Deadline'
                                        badgeNumber={ this.props.numberOfDeadlines }
                                        badgeColor='warning'
                                    />
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("StudentPoint") }>
                                    <MenuItem
                                        backgroundColor='#4CAF50'
                                        icon='body'
                                        text='Điểm rèn luyện'
                                        badgeNumber={ this.props.finalStudentPoint }
                                        badgeColor='primary'
                                    />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("Exam") }>
                                    <MenuItem backgroundColor='#607D8B' icon='school' text='Lịch thi'/>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity onPress={ () => this.props.navigation.navigate("User") }>
                                    <MenuItem backgroundColor='#009688' icon='contact' text='Tài khoản'/>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                </Content>
            </Container>
        );
    }
}
styles = {
    LogoView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 15
    },
    Logo: {
        height: 150,
        width: 150,
        borderRadius: 75,
        borderColor: 'grey',
        borderWidth: 1
    },
    container: {
        flex: 1,
        margin: 15
    },
};