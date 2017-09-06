import React from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { Container, Root } from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Spinner from 'react-native-loading-spinner-overlay';
import RootScreen from './components/Root';
//Reducer
import rootReducer from './components/Root/Reducer';
//Saga
import RootSaga from './components/Root/Saga';
//Object
const { List } = require('immutable');
import { LoginReducer } from './components/Login/Reducer';
import { Course } from './components/Course/Object';
import { CourseListReducer } from './components/Course/Reducer';
import { GeneralNotification, CourseNotification } from './components/Notification/Object';
import { NotificationListReducer } from './components/Notification/Reducer';
import { Deadline } from './components/Deadline/Object';
import { DeadlineListReducer } from './components/Deadline/Reducer';
import { StudentPoint } from './components/StudentPoint/Object';
import { PointListReducer } from './components/StudentPoint/Reducer';
import { Exam } from './components/Exam/Object';
import { ExamListReducer } from './components/Exam/Reducer';
import { UserReducer } from './components/User/Reducer';
//Config
import { APP_STATE_SAVE_KEY } from './config/config';
//Style
import styles from './Style';
const sagaMiddleware = createSagaMiddleware();

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStoreLoading: false,
            store: {}
        }
    }
    componentWillMount() {
        let self = this;
        try {
            this.setState({ isStoreLoading: true });
            //Đọc state từ lưu trữ.
            AsyncStorage.getItem(APP_STATE_SAVE_KEY).then(function(value) {
                if (value && value.length) {
                    let initialStore = JSON.parse(value);
                    //Đưa dữ liệu vào các object.
                    if (typeof initialStore !== 'undefined') {
                        initialStore.firstTime = true;
                        //Login
                        let login = {};
                        if (typeof initialStore.login !== 'undefined') {
                            login = initialStore.login;
                        }
                        login.loading = false;
                        login.error = false;
                        initialStore.login = new LoginReducer(login);
                        //Môn học.
                        let courses = {};
                        let listCourses = [];
                        if (typeof initialStore.courses !== 'undefined') {
                            courses = initialStore.courses;
                            if (typeof courses.listCourses !== 'undefined') {
                                for (let course of courses.listCourses) {
                                    listCourses.push(new Course(course));
                                }
                            }
                        }
                        courses.listCourses = new List(listCourses);
                        courses.loading = false;
                        courses.error = false;
                        initialStore.courses = new CourseListReducer(courses);
                        //Thông báo.
                        let notifications = {};
                        let listGeneralNotifications = [];
                        let listCourseNotifications = [];
                        if (typeof initialStore.notifications !== 'undefined') {
                            notifications = initialStore.notifications;
                            if (typeof notifications.listGeneralNotifications !== 'undefined') {
                                for (let notification of notifications.listGeneralNotifications) {
                                    listGeneralNotifications.push(new GeneralNotification(notification));
                                }
                            }
                            if (typeof notifications.listCourseNotifications !== 'undefined') {
                                if (notifications.listCourseNotifications) {
                                    for (let notification of notifications.listCourseNotifications) {
                                        listCourseNotifications.push(new CourseNotification(notification));
                                    }
                                }
                            }
                            notifications.listGeneralNotifications = new List(listGeneralNotifications);
                            notifications.listCourseNotifications = new List(listCourseNotifications);
                            notifications.loading = false;
                            notifications.error   = false;
                            initialStore.notifications = new NotificationListReducer(notifications);
                        }

                        //Deadline.
                        let deadlines = {};
                        let listDeadlines = [];
                        if (typeof initialStore.deadlines !== 'undefined') {
                            deadlines = initialStore.deadlines;
                            if (typeof deadlines.listDeadlines !== 'undefined') {
                                for (let deadline of deadlines.listDeadlines) {
                                    listDeadlines.push(new Deadline(deadline));
                                }
                            }
                        }
                        deadlines.listDeadlines = new List(listDeadlines);
                        deadlines.loading = false;
                        deadlines.error = false;
                        initialStore.deadlines = new DeadlineListReducer(deadlines);
                        //Điểm rèn luyện.
                        let studentPoints = {};
                        let listPoints = [];
                        if (typeof initialStore.studentPoints !== 'undefined') {
                            studentPoints = initialStore.studentPoints;
                            if (typeof studentPoints.listPoints !== 'undefined') {
                                for (let point of studentPoints.listPoints) {
                                    listPoints.push(new StudentPoint(point));
                                }
                            }
                        }
                        studentPoints.listPoints = new List(listPoints);
                        studentPoints.loading = false;
                        studentPoints.error = false;
                        initialStore.studentPoints = new PointListReducer(studentPoints);
                        //Lịch thi
                        let exams = {};
                        let listExams = [];
                        if (typeof initialStore.exams !== 'undefined') {
                            exams = initialStore.exams;
                            if (typeof exams.listExams !== 'undefined') {
                                for (let exam of exams.listExams) {
                                    listExams.push(new Exam(exam));
                                }
                            }
                        }
                        exams.listExams = new List(listExams);
                        exams.loading = false;
                        exams.error = false;
                        initialStore.exams = new ExamListReducer(exams);
                        //Người dùng.
                        let user = {};
                        if (typeof initialStore.user !== 'undefined') {
                            user = initialStore.user;
                        }
                        user.loading = false;
                        user.error = false;
                        initialStore.user = new UserReducer(user);
                        self.setState({store: createStore(rootReducer, initialStore, applyMiddleware(sagaMiddleware))});
                    }
                    else {
                        self.setState({store: createStore(rootReducer, applyMiddleware(sagaMiddleware))});
                    }
                }
                else {
                    self.setState({store: createStore(rootReducer, applyMiddleware(sagaMiddleware))});
                }
                sagaMiddleware.run(RootSaga);
                self.setState({isStoreLoading: false});
            }).catch(function(e) {
                alert(e.message);
                self.setState({isStoreLoading: false});
            });
        }
        catch(e) {
            self.setState({isStoreLoading: false});
            return undefined;
        }
    }
    //Hàm lưu state nếu có thay đổi.
    handleAppStateChange() {
        if (typeof this.state.store.getState !== 'undefined') {
            let state = this.state.store.getState();
            if (state) {
                let storingValue = JSON.stringify(state);
                AsyncStorage.setItem(APP_STATE_SAVE_KEY, storingValue);
            }
        }
    }
    render() {
        if (this.state.isStoreLoading) {
            return (
                <Spinner
                    visible={ this.state.isStoreLoading }
                    textContent={ "Loading..." }
                    textStyle={{ color: '#FFF' }}
                />
            )
        }
        else {
            //Đăng kí hàm handleAppStateChange vào sự kiện thay đổi state của store.
            this.state.store.subscribe(this.handleAppStateChange.bind(this));
            return (
                <Root>
                    <Provider store={this.state.store}>
                        <Container>
                            <StatusBar
                                backgroundColor={ styles.statusBarColor }
                                barStyle={ styles.iosStatusbar }
                            />
                            <RootScreen />
                        </Container>
                    </Provider>
                </Root>
            )
        }
    }
}