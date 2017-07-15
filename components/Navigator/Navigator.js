import React from 'react';
import { Text, Container, Button, Badge, Footer, FooterTab, Icon } from 'native-base';
import Dashboard from '../Dashboard';
import Notification from '../Notification';
import Course from '../Course';
import User from '../User';
import CourseDetails from '../Course/compoments/Details/indexNavigation';
import { StackNavigator, NavigationActions } from 'react-navigation';

const RootNavigator = StackNavigator (
    {
        Dashboard: { screen: Dashboard },
        Notification: { screen: Notification },
        Course: { screen: Course },
        CourseDetails: { screen: CourseDetails },
        User: { screen: User },
    }
);

export default class NavigatorRoot extends React.Component {
    constructor(props) {
        super(props);
        this.changeTab = this.changeTab.bind(this);
        this.state = {
            Dashboard: true,
            Notification: false,
            Course: false,
            User: false
        }
    }
    changeTab(tabName) {
        let currentRoutes = this.navigation.state.nav.routes;
        //Set active tab
        switch (tabName) {
            case 'Dashboard':
                this.setState({
                    Dashboard: true,
                    Notification: false,
                    Course: false,
                    User: false
                });
                break;
            case 'Notification':
                this.setState({
                    Dashboard: false,
                    Notification: true,
                    Course: false,
                    User: false
                });
                break;
            case 'Course':
                this.setState({
                    Dashboard: false,
                    Notification: false,
                    Course: true,
                    User: false
                });
                break;
            case 'User':
                this.setState({
                    Dashboard: false,
                    Notification: false,
                    Course: false,
                    User: true
                });
                break;
        }
        for (let route in currentRoutes) {
            if (currentRoutes.hasOwnProperty(route)) {
                route = currentRoutes[route];
                if (route.hasOwnProperty('routeName')) {
                    if (route.routeName === tabName) return;
                }
            }
        }
        this.navigation.dispatch(NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: tabName })
            ]
        }));
    }
    render() {
        return (
            <Container>
                <RootNavigator ref={(nav) => this.navigation = nav}/>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.changeTab('Dashboard')} active={ this.state.Dashboard } vertical>
                            <Icon name="apps" />
                            <Text uppercase={false}>Dashboard</Text>
                        </Button>
                        <Button onPress={() => this.changeTab('Notification')} active={ this.state.Notification } vertical>
                            <Icon name="text" />
                            <Text uppercase={false}>Thông Báo</Text>
                        </Button>
                        <Button onPress={() => this.changeTab('Course')} active={ this.state.Course } badge vertical>
                            <Badge info><Text>{ this.props.numberOfCourses }</Text></Badge>
                            <Icon active name="calculator" />
                            <Text uppercase={false}>Lớp Học</Text>
                        </Button>
                        <Button onPress={() => this.changeTab('User')} active={ this.state.User } vertical>
                            <Icon name="contact" />
                            <Text uppercase={false}>Tài khoản</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}