import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView } from 'react-native';
import { Header, Left, Button, Icon, Body, Title, Right, Spinner } from 'native-base';
import { backAction } from '../../config/config';

export default class CustomWebView extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      backButtonEnabled: false,
      forwardButtonEnabled: false,
      title: 'Xem chi tiết',
    };
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
    this.reload = this.reload.bind(this);
  }

  onNavigationStateChange(navState) {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      title: navState.title,
    });
  }

  goBack() {
    this.webview.goBack();
  }

  goForward() {
    this.webview.goForward();
  }

  reload() {
    this.webview.reload();
  }

  render() {
    const { link } = this.props.navigation.state.params;
    const { title, backButtonEnabled, forwardButtonEnabled } = this.state;
    const backIconStyle = backButtonEnabled ? {} : { color: '#8C8C8C' };
    const forwardIconStyle = forwardButtonEnabled ? {} : { color: '#8C8C8C' };
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <Left>
            <Button onPress={() => this.props.navigation.dispatch(backAction)} transparent>
              <Icon style={{ fontSize: 40 }} name="close" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            <Button disabled={!backButtonEnabled} onPress={this.goBack} transparent>
              <Icon style={backIconStyle} name="arrow-back" />
            </Button>
            <Button onPress={this.reload} transparent>
              <Icon name="refresh" />
            </Button>
            <Button disabled={!forwardButtonEnabled} onPress={this.goForward} transparent>
              <Icon style={forwardIconStyle} name="arrow-forward" />
            </Button>
          </Right>
        </Header>
        <WebView
          ref={(ref) => {
            this.webview = ref;
          }}
          style={{ flex: 1 }}
          source={{
            uri: link,
          }}
          dataDetectorTypes="all"
          decelerationRate="normal"
          renderLoading={() => <Spinner color="#4164c9" />}
          domStorageEnabled
          javaScriptEnabled
          scalesPageToFit
          startInLoadingState
          onNavigationStateChange={this.onNavigationStateChange}
        />
      </View>
    );
  }
}

CustomWebView.defaultProps = {};
CustomWebView.propTypes = {
  navigation: PropTypes.object.isRequired,
};
