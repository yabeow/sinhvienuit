import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import { Container, Button, Badge, Footer, FooterTab, Icon } from 'native-base';
import NavigationScreen from './compoments/Navigation';
import Dashboard from '../Dashboard';
import Notification from '../Notification';
import Course from '../Course';
import User from '../User';

const RootNavigator = DrawerNavigator (
    {
        Dashboard: { screen: Dashboard },
        Notification: { screen: Notification },
        Course: { screen: Course },
        User: { screen: User },
    },
    {
        drawerWidth: 250,
        contentComponent: props => <NavigationScreen {...props} />
    }
);

export default class NavigatorRoot extends React.Component {
    render() {
        return (
            <RootNavigator ref={(nav) => this.navigation = nav}/>
        )
    }
}