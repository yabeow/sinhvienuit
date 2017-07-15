import reducerFromClass from '../../utils/reducerFromClass';
const Cookie = require('react-native-cookies');
import Login from './Object';

export class LoginReducer extends Login {
    SET_USERNAME({ username }) {
        return this.set('username', username);
    }
    SET_PASSWORD({ password }) {
        return this.set('password', password);
    }
    SET_LOGIN_LOADING({ loading }) {
        return this.set('loading', loading);
    }
    SET_LOGIN_ERROR({ error }) {
        return this.set('error', error);
    }
    SET_LOGGED_IN({ loggedIn }) {
        return this.set('loggedIn', loggedIn);
    }
    LOGOUT() {
        //Clear cookies
        Cookie.clearAll((err, res) => {});
        return this.set('loggedIn', false);
    }
}
export default reducerFromClass(LoginReducer);