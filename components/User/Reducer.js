import User from './Object';
import { reducerFromClass } from '../../utils';

export class UserReducer extends User {
  SET_USER_LOADING({ loading }) {
    return this.set('loading', loading);
  }
  SET_USER_ERROR({ error }) {
    return this.set('error', error);
  }
  SET_USER_INFORMATION({ user }) {
    let newUser = this.set('name', user.getName());
    newUser = newUser.set('birthDay', user.getBirthDay());
    newUser = newUser.set('faculty', user.getFaculty());
    newUser = newUser.set('trainType', user.getTrainType());
    return newUser;
  }
  SET_USER_PICTURE({ picture }) {
    return this.set('picture', picture);
  }
}
export default reducerFromClass(UserReducer);
