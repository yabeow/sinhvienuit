import React from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { Container, Root } from 'native-base';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import Spinner from 'react-native-loading-spinner-overlay';
import RootScreen from './components/Root';
// Reducer
import rootReducer from './components/Root/Reducer';
// Saga
import RootSaga from './components/Root/Saga';
// Utils
import jsonToObject from './utils/jsonToObject';
// Config
import { APP_STATE_SAVE_KEY } from './config/config';
// Style
import styles from './Style';

const sagaMiddleware = createSagaMiddleware();

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: {},
    };
  }
  componentWillMount() {
    const self = this;
    try {
      this.setState({ isStoreLoading: true });
      // Đọc state từ lưu trữ.
      AsyncStorage.getItem(APP_STATE_SAVE_KEY)
        .then((value) => {
          if (value && value.length) {
            const initialStore = jsonToObject(value);
            if (initialStore !== 'undefined') {
              self.setState({
                store: createStore(
                  rootReducer,
                  initialStore,
                  composeWithDevTools(applyMiddleware(sagaMiddleware)),
                ),
              });
            } else {
              self.setState({ store: createStore(rootReducer, applyMiddleware(sagaMiddleware)) });
            }
          } else {
            self.setState({ store: createStore(rootReducer, applyMiddleware(sagaMiddleware)) });
          }
          sagaMiddleware.run(RootSaga);
          self.setState({ isStoreLoading: false });
        })
        .catch((e) => {
          alert(e.message);
          self.setState({ isStoreLoading: false });
        });
    } catch (e) {
      self.setState({ isStoreLoading: false });
      return undefined;
    }
    return undefined;
  }
  // Hàm lưu state nếu có thay đổi.
  handleAppStateChange() {
    if (typeof this.state.store.getState !== 'undefined') {
      const state = this.state.store.getState();
      if (state) {
        const storingValue = JSON.stringify(state);
        AsyncStorage.setItem(APP_STATE_SAVE_KEY, storingValue);
      }
    }
  }
  render() {
    if (this.state.isStoreLoading) {
      return (
        <Spinner
          visible={this.state.isStoreLoading}
          textContent="Loading..."
          textStyle={{ color: '#FFF' }}
        />
      );
    }
    // Đăng kí hàm handleAppStateChange vào sự kiện thay đổi state của store.
    this.state.store.subscribe(this.handleAppStateChange.bind(this));
    return (
      <Root>
        <Provider store={this.state.store}>
          <Container>
            <StatusBar backgroundColor={styles.statusBarColor} barStyle="light-content" />
            <RootScreen />
          </Container>
        </Provider>
      </Root>
    );
  }
}
