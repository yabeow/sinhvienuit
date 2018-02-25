import RNCalendarEvents from 'react-native-calendar-events';

export const checkCalendarPermisson = () =>
  new Promise((resolve, reject) => {
    RNCalendarEvents.authorizeEventStore()
      .then((status) => {
        if (status === 'authorized') {
          resolve();
        } else {
          reject();
        }
      })
      .catch(error => reject(error));
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
