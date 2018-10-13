import RNCalendarEvents from 'react-native-calendar-events';
import { Alert } from 'react-native';

export const checkCalendarPermisson = () =>
  new Promise((resolve, reject) => {
    RNCalendarEvents.authorizationStatus()
      .then((status) => {
        if (status === 'authorized') {
          resolve();
        } else {
          reject(new Error('Vui lòng cho phép ứng dụng quyền truy cập vào Lịch'));
        }
      })
      .catch(error => reject(error));
  });

export const requestCalendarPermisson = () =>
  new Promise((resolve, reject) => {
    Alert.alert('Cho phép truy cập', 'Ứng dụng cần cấp quyền truy cập Lịch để thêm các thông báo', [
      {
        text: 'Đồng ý',
        onPress: () =>
          RNCalendarEvents.authorizeEventStore()
            .then((status) => {
              if (status === 'authorized') {
                resolve();
              } else {
                reject();
              }
            })
            .catch(error => reject(error)),
      },
      { text: 'Để sau', onPress: () => reject(), style: 'cancel' },
    ]);
  });

export const addCalendarEvent = ({
  title, location, notes, startDate, endDate,
}) =>
  checkCalendarPermisson()
    .then(() =>
      RNCalendarEvents.saveEvent(title, {
        location,
        notes,
        startDate,
        endDate,
      })
        .then(id => id)
        .catch(() => ''))
    .catch(() => '');

export const getCalendarEvents = (startDate, endDate) =>
  checkCalendarPermisson()
    .then(() =>
      RNCalendarEvents.fetchAllEvents(startDate, endDate, [])
        .then(events => events)
        .catch(() => []))
    .catch(() => []);
