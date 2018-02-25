import { LoginReducer } from '../components/Login/Reducer';
import { Course } from '../components/Course/Object';
import { CourseListReducer } from '../components/Course/Reducer';
import { GeneralNotification, CourseNotification } from '../components/Notification/Object';
import { NotificationListReducer } from '../components/Notification/Reducer';
import { Deadline } from '../components/Deadline/Object';
import { DeadlineListReducer } from '../components/Deadline/Reducer';
import { StudentPoint } from '../components/StudentPoint/Object';
import { PointListReducer } from '../components/StudentPoint/Reducer';
import { Exam } from '../components/Exam/Object';
import { ExamListReducer } from '../components/Exam/Reducer';
import { UserReducer } from '../components/User/Reducer';

const { List } = require('immutable');

export default (json) => {
  const initialStore = JSON.parse(json);
  // Đưa dữ liệu vào các object.
  if (typeof initialStore !== 'undefined') {
    // Login
    let loginObj = {
      loading: false,
      error: '',
    };
    if (typeof initialStore.login !== 'undefined') {
      const { login } = initialStore;
      loginObj = { ...login, ...loginObj };
    }
    initialStore.login = new LoginReducer(loginObj);
    // Môn học.
    let listCoursesObj = [];
    if (typeof initialStore.courses !== 'undefined') {
      const { courses } = initialStore;
      const { listCourses } = courses;
      listCoursesObj = listCourses.map(item => new Course(item));
    }
    const courses = {
      loading: false,
      error: '',
    };
    courses.listCourses = new List(listCoursesObj);
    initialStore.courses = new CourseListReducer(courses);
    // Thông báo.
    let listGeneralNotificationsObj = [];
    let listCourseNotificationsObj = [];
    if (typeof initialStore.notifications !== 'undefined') {
      const { notifications } = initialStore;
      const { listGeneralNotifications, listCourseNotifications } = notifications;
      listGeneralNotificationsObj = listGeneralNotifications.map(item => new GeneralNotification(item));
      listCourseNotificationsObj = listCourseNotifications.map(item => new CourseNotification(item));
    }
    const notificationsObj = {
      listGeneralNotifications: new List(listGeneralNotificationsObj),
      listCourseNotifications: new List(listCourseNotificationsObj),
      loading: false,
      error: '',
    };
    initialStore.notifications = new NotificationListReducer(notificationsObj);

    // Deadline.
    let listDeadlinesObj = [];
    if (typeof initialStore.deadlines !== 'undefined') {
      const { deadlines } = initialStore;
      const { listDeadlines } = deadlines;
      listDeadlinesObj = listDeadlines.map(item => new Deadline(item));
    }
    const deadlines = {
      listDeadlines: new List(listDeadlinesObj),
      loading: false,
      error: '',
    };
    initialStore.deadlines = new DeadlineListReducer(deadlines);
    // Điểm rèn luyện.
    let point = 0;
    let listPointsObj = [];
    if (typeof initialStore.studentPoints !== 'undefined') {
      const { studentPoints } = initialStore;
      const { finalPoint, listPoints } = studentPoints;
      point = finalPoint;
      listPointsObj = listPoints.map(item => new StudentPoint(item));
    }
    const studentPoints = {
      listPoints: new List(listPointsObj),
      finalPoint: point,
      loading: false,
      error: '',
    };
    initialStore.studentPoints = new PointListReducer(studentPoints);
    // Lịch thi
    let listExamsObj = [];
    if (typeof initialStore.exams !== 'undefined') {
      const { exams } = initialStore;
      const { listExams } = exams;
      listExamsObj = listExams.map(item => new Exam(item));
    }
    const exams = {
      listExams: new List(listExamsObj),
      loading: false,
      error: '',
    };
    initialStore.exams = new ExamListReducer(exams);
    // Người dùng.
    let userObj = {
      loading: false,
      error: '',
    };
    if (typeof initialStore.user !== 'undefined') {
      const { user } = initialStore;
      userObj = { ...user, ...userObj };
    }
    initialStore.user = new UserReducer(userObj);
  }
  return initialStore;
};
