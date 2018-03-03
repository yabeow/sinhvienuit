import { NavigationActions } from 'react-navigation';

let _container; // eslint-disable-line

function setContainer(container) {
  _container = container;
}

function reset(routeName, params) {
  _container.dispatch(NavigationActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        type: 'Navigation/NAVIGATE',
        routeName,
        params,
      }),
    ],
  }));
}

function navigate(routeName, params) {
  _container.dispatch(NavigationActions.navigate({
    type: 'Navigation/NAVIGATE',
    routeName,
    params,
  }));
}

function getCurrentRoute() {
  if (!_container || !_container.state.nav) {
    return null;
  }

  return _container.state.nav.routes[_container.state.nav.index] || null;
}

export default {
  setContainer,
  navigate,
  reset,
  getCurrentRoute,
};
